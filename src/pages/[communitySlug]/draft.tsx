/* eslint-disable no-underscore-dangle */
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import {
  useUpdatePostMutation,
  Post,
  Media,
  MediaFormat,
  Tag,
  PostStatus,
  useUploadImageMutation,
  useUpdatePostMainMediaThumbnailMutation,
  PaginatedTags,
  useGetPostByIdLazyQuery,
  useGetCommunityBasicDataLazyQuery,
} from '../../generated/graphql';
import {
  PublishOptions,
  PublishOptionInput,
  PublishButton,
  ConfirmationModal,
  ContentArea,
  ContentWrapperArea,
  PublishOptionSwitch,
  VideoThumbnailContainer,
  VideoThumbnailPreview,
} from '../../styles/pages/NewPost';
import PublishOption from '../../components/PublishOption';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { InputWithTagSuggestion } from '../../components/InputWithTagSuggestion';
import Modal from '../../components/Modal';
import Switch from '../../components/Switch';
import MediaInput from '../../components/MediaInput';
import { formatS3Filename, uploadToS3 } from '../../lib/s3';
import { withApollo } from '../../utils/withApollo';
import { Tags, CommunityTag } from '../../components/Tags';
import { SEO } from '../../components/SEO';
import { PostMainMedia } from '../../components/PostMainMedia';

const PostBuilder = dynamic(() => import('../../components/PostBuilder'), {
  ssr: false,
});

interface QueryProps {
  communitySlug: string;
}

function NewPost(): JSX.Element {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { communitySlug } = router.query as unknown as QueryProps;

  const [getPostData, { data: postData, loading: loadingPostData }] =
    useGetPostByIdLazyQuery();
  const [updatePost] = useUpdatePostMutation();

  const [post, setPost] = useState<
    | ({ __typename?: 'Post' } & Pick<
        Post,
        | '_id'
        | 'title'
        | 'formattedTitle'
        | 'slug'
        | 'description'
        | 'status'
        | 'content'
        | 'exclusive'
      > & {
          mainMedia?:
            | ({ __typename?: 'Media' } & Pick<
                Media,
                '_id' | 'url' | 'thumbnailUrl' | 'format'
              >)
            | null
            | undefined;
          tags: { __typename?: 'PaginatedTags' } & Pick<
            PaginatedTags,
            'hasMore'
          > & {
              tags: Array<
                { __typename?: 'Tag' } & Pick<
                  Tag,
                  '_id' | 'title' | 'postCount'
                >
              >;
            };
        })
    | undefined
    | null
  >(postData?.findPostById?.post);
  const [saveState, setSaveState] = useState<'saved' | 'saving'>('saved');
  const [description, setDescription] = useState<string | null | undefined>();
  const [slug, setSlug] = useState<string | null | undefined>();
  const [exclusive, setExclusive] = useState<boolean>(true);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
  const [tags, setTags] = useState<CommunityTag[]>([]);

  const [uploadImage] = useUploadImageMutation();

  const [getCommunityBasicData, { data: communityData }] =
    useGetCommunityBasicDataLazyQuery();

  const community = communityData && communityData.community.community;

  const handleMediaUpload = useCallback(
    // eslint-disable-next-line consistent-return
    async (file: File, commSlug: string) => {
      const [filename, fileExtension] = formatS3Filename(file.name, commSlug);

      const { data: uploadData } = await uploadImage({
        variables: {
          communitySlug: commSlug,
          imageData: {
            format: MediaFormat.Image,
            file: {
              name: filename,
              type: file.type,
              extension: fileExtension,
            },
          },
        },
      });

      if (
        uploadData &&
        uploadData.uploadImage &&
        uploadData.uploadImage.media
      ) {
        const { uploadLink } = uploadData.uploadImage.media;

        try {
          await uploadToS3(file, uploadLink);

          const { media } = uploadData.uploadImage;

          return media;
        } catch (err) {
          console.log(err);
        }
      }
    },
    [uploadImage],
  );

  const [updateThumbnail] = useUpdatePostMainMediaThumbnailMutation();

  const handleThumbnailSelect = useCallback(
    async (
      file: File,
      postId: string,
      communityId: string,
      commSlug: string,
    ) => {
      const media = await handleMediaUpload(file, commSlug);

      const { data: postThumbnailData } = await updateThumbnail({
        variables: {
          communityId,
          postId,
          mainMediaData: {
            thumbnailUrl: media?.url,
          },
        },
      });

      if (
        postThumbnailData &&
        postThumbnailData.updatePostMainMedia &&
        postThumbnailData.updatePostMainMedia.post &&
        postThumbnailData.updatePostMainMedia.post.mainMedia
      ) {
        const { thumbnailUrl: url } =
          postThumbnailData.updatePostMainMedia.post.mainMedia;

        url && setThumbnailUrl(url);
      }
    },
    [handleMediaUpload, updateThumbnail],
  );

  useEffect(() => {
    if (id) {
      getPostData({
        variables: {
          id,
        },
      });
    }
  }, [getPostData, id]);

  useEffect(() => {
    if (communitySlug) {
      getCommunityBasicData({
        variables: {
          slug: communitySlug,
        },
      });
    }
  }, [communitySlug, getCommunityBasicData]);

  useEffect(() => {
    if (postData && postData.findPostById && postData.findPostById.post) {
      setPost(postData.findPostById.post);

      setDescription(postData.findPostById.post.description);

      setSlug(postData.findPostById.post.slug);

      setTags(postData.findPostById.post.tags.tags);

      postData.findPostById.post.exclusive === true && setExclusive(true);
      postData.findPostById.post.exclusive === false && setExclusive(false);

      postData.findPostById.post.mainMedia?.format === MediaFormat.Video &&
        postData.findPostById.post.mainMedia.thumbnailUrl &&
        setThumbnailUrl(postData.findPostById.post.mainMedia.thumbnailUrl);
    }
  }, [postData]);

  const getEditorSaveState = useCallback((state: 'saved' | 'saving'): void => {
    setSaveState(state);
  }, []);

  const publishPost = useCallback(async () => {
    const result = await updatePost({
      variables: {
        communitySlug,
        postId: id,
        post: {
          description,
          slug,
          exclusive,
          status: PostStatus.Published,
        },
      },
    });

    const postURL = `/${communitySlug}/post/${result.data?.updatePost?.post?.slug}`;

    router.push(postURL);
  }, [updatePost, communitySlug, id, description, slug, exclusive, router]);

  const handleRemoveTagFromPost = useCallback(
    async (tagId: string) => {
      const newTags = tags.filter(stateTag => stateTag._id !== tagId);

      setTags(newTags);

      const newTagsIds = newTags.map(tag => tag._id);

      await updatePost({
        variables: {
          communitySlug,
          postId: post?._id,
          post: {
            tags: newTagsIds,
          },
        },
      });
    },
    [communitySlug, post?._id, tags, updatePost],
  );

  const handleSelectTag = useCallback(
    async (tag: CommunityTag) => {
      const newTags = [...tags, tag];

      setTags(newTags);

      const newTagsIds = newTags.map(t => t._id);

      await updatePost({
        variables: {
          communitySlug,
          postId: post?._id,
          post: {
            tags: newTagsIds,
          },
        },
      });
    },
    [communitySlug, post?._id, tags, updatePost],
  );

  return (
    <>
      <SEO
        title={post?.title ? post.title : 'Rascunho'}
        // description={} // Criar campo de description para SEO
        communityTitle={community?.title}
      />

      <Header
        communityTitle={community ? community.title : 'Headshare'}
        communitySlug={community ? community.slug : ''}
        editorMode={saveState}
      />
      <div style={{ height: '56px' }} />

      <PostMainMedia communitySlug={communitySlug} postId={id} />

      <ContentWrapperArea>
        <ContentArea>
          {loadingPostData ? (
            <h3 style={{ margin: '25px 12px' }}>Carregando...</h3>
          ) : (
            <PostBuilder
              postId={id}
              communitySlug={communitySlug}
              postContent={{
                title: postData?.findPostById?.post?.title || 'Título',
                formattedTitle:
                  postData?.findPostById?.post?.formattedTitle ||
                  '<h1>Título</h1>',
                text:
                  postData?.findPostById?.post?.content ||
                  '<p>Espalhe sua história...</p>',
              }}
              passSaveState={getEditorSaveState}
            />
          )}

          <PublishOptions>
            <PublishOption index={1} title="Informações básicas">
              <PublishOptionInput>
                <p>
                  Escreva uma descrição curta (até 80 caracteres) para o post:
                </p>

                <Input
                  name="post-description"
                  label="Descrição"
                  value={description || ''}
                  onChange={e => setDescription(e.target.value)}
                  maxLength={80}
                />
              </PublishOptionInput>

              <PublishOptionInput>
                <p>
                  Defina um slug para usarmos na url do post:{' '}
                  <small>(opcional)</small>
                </p>

                <Input
                  name="post-slug"
                  label="Slug"
                  value={slug || ''}
                  onChange={e => setSlug(e.target.value)}
                  maxLength={30}
                />
              </PublishOptionInput>

              <PublishOptionInput>
                <p>
                  Este post será exclusivo ou poderá ser acessado por qualquer
                  pessoa?
                </p>

                <PublishOptionSwitch>
                  <div>
                    <span>Conteúdo exclusivo:</span>
                  </div>
                  <Switch
                    id="exclusive-switch"
                    isOn={exclusive}
                    handleToggle={() => setExclusive(!exclusive)}
                  />
                </PublishOptionSwitch>
              </PublishOptionInput>

              <PublishOptionInput>
                <p>
                  Importe uma miniatura do seu vídeo:{' '}
                  <small>(melhor formato: 1280x720px)</small>
                </p>

                {!thumbnailUrl && (
                  <VideoThumbnailContainer>
                    <MediaInput
                      name="video-thumbnail"
                      label="Miniatura"
                      getFile={file =>
                        handleThumbnailSelect(
                          file,
                          id,
                          community?._id,
                          communitySlug,
                        )
                      }
                      fileType="image"
                    />
                  </VideoThumbnailContainer>
                )}

                {thumbnailUrl && (
                  <VideoThumbnailPreview>
                    <MediaInput
                      name="video-thumbnail"
                      label="Miniatura"
                      getFile={file =>
                        handleThumbnailSelect(
                          file,
                          id,
                          community?._id,
                          communitySlug,
                        )
                      }
                      currentFileUrl={thumbnailUrl}
                      fileType="image"
                    >
                      <img src={thumbnailUrl} alt="thumbnail" />
                    </MediaInput>
                  </VideoThumbnailPreview>
                )}
              </PublishOptionInput>
            </PublishOption>

            <PublishOption index={2} title="Tags">
              <PublishOptionInput>
                <p>Selecione uma ou mais tags para classificar seu post:</p>

                <Tags
                  tags={tags}
                  handleTagExclusion={handleRemoveTagFromPost}
                />

                <InputWithTagSuggestion
                  inputName="post-description"
                  inputLabel="Descrição"
                  communitySlug={communitySlug}
                  selectedTags={tags}
                  selectTag={handleSelectTag}
                />
              </PublishOptionInput>
            </PublishOption>

            <PublishButton>
              <Button
                text="Publicar"
                stretch
                onClick={() => setIsOpenConfirmation(true)}
              />
            </PublishButton>
          </PublishOptions>
        </ContentArea>
      </ContentWrapperArea>

      <Modal
        isOpen={isOpenConfirmation}
        setIsOpen={() => setIsOpenConfirmation(false)}
      >
        <ConfirmationModal>
          <h2>Tudo certo para postar?</h2>

          <p>
            Ao publicar, este texto ficará disponível para todo o público
            selecionado
          </p>

          <Button text="Publicar" type="button" stretch onClick={publishPost} />
          <button type="button" onClick={() => setIsOpenConfirmation(false)}>
            Ainda não
          </button>
        </ConfirmationModal>
      </Modal>
    </>
  );
}

export default withApollo({ ssr: false })(NewPost);
