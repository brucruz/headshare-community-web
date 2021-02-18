/* eslint-disable no-underscore-dangle */
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactPlayer from 'react-player';

import { MdPause } from 'react-icons/md';
import Header from '../../components/Header';
import {
  useGetCommunityBasicDataQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  Post,
  Media,
  MediaFormat,
  Tag,
  PostStatus,
  useUploadImageMutation,
  useUpdatePostMainMediaThumbnailMutation,
} from '../../generated/graphql';
import {
  ImageVideoIcon,
  ImageVideoUpload,
  ImageVideoUploading,
  ImageVideoUploaded,
  UploadStatus,
  UploadStatusHeader,
  UploadPauseResumeButton,
  UploadStatusBarContainer,
  UploadStatusBar,
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
import UploadModal, { UploadInfoProps } from '../../components/UploadModal';
import readableBytes from '../../utils/readableBytes';
import PublishOption from '../../components/PublishOption';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InputWithTagSuggestion from '../../components/InputWithTagSuggestion';
import Modal from '../../components/Modal';
import Switch from '../../components/Switch';
import MediaInput from '../../components/MediaInput';
import { formatS3Filename, uploadToS3 } from '../../lib/s3';
import { withApollo } from '../../utils/withApollo';

const PostBuilder = dynamic(() => import('../../components/PostBuilder'), {
  ssr: false,
});

interface QueryProps {
  communitySlug: string;
}

function NewPost(): JSX.Element {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { communitySlug } = (router.query as unknown) as QueryProps;

  const { data: postData, loading: loadingPostData } = useGetPostByIdQuery({
    variables: {
      id,
    },
  });
  const [updatePost] = useUpdatePostMutation();

  const [displayMainMediaModal, setDisplayMainMediaModal] = useState(false);
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
          tags: Array<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'title'>>;
        })
    | undefined
    | null
  >(postData?.findPostById?.post);
  const [mainMediaState, setMainMediaState] = useState<
    'empty' | 'uploading' | 'ready'
  >('empty');
  const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
    bytesSent: 0,
    bytesTotal: 0,
    progress: 0,
  });
  const [saveState, setSaveState] = useState<'saved' | 'saving'>('saved');
  const [description, setDescription] = useState<string | null | undefined>();
  const [slug, setSlug] = useState<string | null | undefined>();
  const [exclusive, setExclusive] = useState<boolean>(true);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();

  const [uploadImage] = useUploadImageMutation();

  const { data: communityData } = useGetCommunityBasicDataQuery({
    variables: {
      slug: communitySlug,
    },
  });

  const community = communityData && communityData.community.community;

  const handleMediaUpload = useCallback(
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
        const {
          thumbnailUrl: url,
        } = postThumbnailData.updatePostMainMedia.post.mainMedia;

        url && setThumbnailUrl(url);
      }
    },
    [handleMediaUpload, updateThumbnail],
  );

  useEffect(() => {
    if (post) {
      if (!post.mainMedia) {
        setMainMediaState('empty');
      } else {
        setMainMediaState('ready');

        return;
      }
    }
    setMainMediaState('empty');
  }, [post]);

  useEffect(() => {
    if (postData && postData.findPostById && postData.findPostById.post) {
      setPost(postData.findPostById.post);

      setDescription(postData.findPostById.post.description);

      setSlug(postData.findPostById.post.slug);

      postData.findPostById.post.exclusive &&
        setExclusive(postData.findPostById.post.exclusive);

      postData.findPostById.post.mainMedia?.format === MediaFormat.Video &&
        postData.findPostById.post.mainMedia.thumbnailUrl &&
        setThumbnailUrl(postData.findPostById.post.mainMedia.thumbnailUrl);
    }
  }, [postData]);

  useEffect(() => {
    if (
      mainMediaState === 'ready' &&
      post &&
      !post.mainMedia &&
      uploadInfo.mainMedia
    ) {
      updatePost({
        variables: {
          communitySlug,
          postId: id,
          post: {
            // eslint-disable-next-line no-underscore-dangle
            mainMedia: uploadInfo.mainMedia._id,
            exclusive,
          },
        },
      }).then(result => {
        if (
          result.data &&
          result.data.updatePost &&
          result.data.updatePost.post
        ) {
          setPost(result.data.updatePost.post);
        }
      });
    }
  }, [
    mainMediaState,
    post,
    updatePost,
    communitySlug,
    id,
    uploadInfo,
    exclusive,
  ]);

  const formattedUpload = useMemo(() => {
    const bytesSent =
      uploadInfo.bytesSent === 0 ? '0 Kb' : readableBytes(uploadInfo.bytesSent);
    const bytesTotal =
      uploadInfo.bytesTotal === 0
        ? '0 Kb'
        : readableBytes(uploadInfo.bytesTotal);
    const progress = `${(uploadInfo.progress * 100).toFixed(1)}%`;

    return {
      bytesSent,
      bytesTotal,
      progress,
    };
  }, [uploadInfo]);

  const getEditorSaveState = useCallback((state: 'saved' | 'saving'): void => {
    setSaveState(state);
  }, []);

  console.log(exclusive);

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

  return (
    <>
      <Header
        communityTitle={community ? community.title : 'Headshare'}
        communitySlug={community ? community.slug : ''}
        editorMode={saveState}
      />
      <div style={{ height: '56px' }} />
      {mainMediaState === 'empty' && (
        <ImageVideoUpload
          type="button"
          onClick={() => setDisplayMainMediaModal(!displayMainMediaModal)}
        >
          <ImageVideoIcon>
            <Image
              src="https://headshare.s3.amazonaws.com/assets/components/image_icon.png"
              height={100}
              width={100}
            />
          </ImageVideoIcon>
        </ImageVideoUpload>
      )}

      {mainMediaState === 'uploading' && (
        <ImageVideoUploading>
          <UploadStatus>
            <UploadStatusHeader>
              <UploadStatusBarContainer>
                <UploadStatusBar progress={uploadInfo.progress} />
              </UploadStatusBarContainer>
              <UploadPauseResumeButton>
                <MdPause />
              </UploadPauseResumeButton>
            </UploadStatusHeader>

            <h5>
              Uploaded {formattedUpload.bytesSent} of{' '}
              {formattedUpload.bytesTotal} ({formattedUpload.progress})
            </h5>
          </UploadStatus>
        </ImageVideoUploading>
      )}

      {mainMediaState === 'ready' &&
        postData &&
        postData.findPostById &&
        postData.findPostById.post &&
        (postData.findPostById.post.mainMedia || uploadInfo.mainMedia?.url) && (
          <ImageVideoUploaded>
            {(postData.findPostById.post.mainMedia?.format ===
              MediaFormat.Video ||
              uploadInfo.mainMedia?.format === MediaFormat.Video) && (
              <ReactPlayer
                url={
                  postData.findPostById.post.mainMedia?.url ||
                  uploadInfo.mainMedia?.url
                }
                controls
                muted={false}
                light
                height="100%"
                width="100%"
              />
            )}
          </ImageVideoUploaded>
        )}

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

              {post?.mainMedia?.format === MediaFormat.Video && (
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
                      >
                        <img src={thumbnailUrl} alt="thumbnail" />
                      </MediaInput>
                    </VideoThumbnailPreview>
                  )}
                </PublishOptionInput>
              )}
            </PublishOption>

            <PublishOption index={2} title="Tags">
              <PublishOptionInput>
                <p>Selecione uma ou mais tags para classificar seu post:</p>

                <InputWithTagSuggestion
                  inputName="post-description"
                  inputLabel="Descrição"
                  communitySlug={communitySlug}
                  postId={id}
                  initialTags={post?.tags || []}
                  receivedInfo={!!post?.tags || false}
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

      <UploadModal
        displayUploadModal={displayMainMediaModal}
        setDisplayUploadModal={setDisplayMainMediaModal}
        communitySlug={communitySlug}
        setMainMediaState={args => setMainMediaState(args)}
        passUploadInfo={args => setUploadInfo(args)}
      />

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
