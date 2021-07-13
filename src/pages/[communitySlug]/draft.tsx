/* eslint-disable no-underscore-dangle */
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import {
  useUpdatePostMutation,
  Post,
  Media,
  Tag,
  PostStatus,
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
} from '../../styles/pages/NewPost';
import PublishOption from '../../components/PublishOption';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { InputWithTagSuggestion } from '../../components/InputWithTagSuggestion';
import Modal from '../../components/Modal';
import { withApollo } from '../../utils/withApollo';
import { Tags, CommunityTag } from '../../components/Tags';
import { SEO } from '../../components/SEO';
import { PostMainMedia } from '../../components/PostMainMedia';
import {
  UpdatePostCallbackResponse,
  useSavePostBuilder,
} from '../../hooks/useSavePostBuilder';
import { PostCover } from '../../components/PostCover';

const PostBuilder = dynamic(() => import('../../components/PostBuilder'), {
  ssr: false,
});

interface QueryProps {
  communitySlug: string;
}

interface PostOptionsProps {
  communitySlug: string;
  postId: string;
  description?: string | null;
  slug?: string | null;
  exclusive?: boolean | null;
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
  const [postOptions, setPostOptions] = useState<PostOptionsProps>({
    communitySlug,
    postId: id,
    description: post?.description,
    exclusive: post?.exclusive,
    slug: post?.slug,
  });
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [tags, setTags] = useState<CommunityTag[]>([]);

  const [getCommunityBasicData, { data: communityData }] =
    useGetCommunityBasicDataLazyQuery();

  const community = communityData && communityData.community.community;

  const Switch = dynamic(
    () => postOptions && import('../../components/Switch'),
    {
      ssr: false,
    },
  );

  const updatePostOptionsCallback = useCallback(
    async (
      postOptionsInfo: PostOptionsProps,
      controllerSignal: AbortController['signal'],
    ): Promise<UpdatePostCallbackResponse> => {
      if (!postOptionsInfo.communitySlug || !postOptionsInfo.postId) {
        return {
          callbackStatus: 'error',
        };
      }

      const response = await updatePost({
        variables: {
          communitySlug: postOptionsInfo.communitySlug,
          postId: postOptionsInfo.postId,
          post: {
            description: postOptionsInfo.description,
            slug: postOptionsInfo.slug,
            exclusive: postOptionsInfo.exclusive,
          },
        },
        context: { fetchOptions: { signal: controllerSignal } },
      });

      if (!response.data && response.errors) {
        const callbackResponse: UpdatePostCallbackResponse = {
          callbackStatus: 'error',
          message: `Ocorreu um erro ao atualizar as opções do post. ${response.errors}`,
        };

        return callbackResponse;
      }

      if (response.data?.updatePost?.errors) {
        const callbackResponse: UpdatePostCallbackResponse = {
          callbackStatus: 'error',
          message: response.data.updatePost.errors[0].message,
        };

        return callbackResponse;
      }

      if (response.data?.updatePost?.post) {
        const callbackResponse: UpdatePostCallbackResponse = {
          callbackStatus: 'success',
        };

        return callbackResponse;
      }

      const callbackResponse: UpdatePostCallbackResponse = {
        callbackStatus: 'error',
      };

      return callbackResponse;
    },
    [updatePost],
  );

  const initialPostData = useMemo(() => {
    if (postData && postData.findPostById?.post?.exclusive !== undefined) {
      return {
        communitySlug,
        postId: id,
        exclusive: postData.findPostById.post.exclusive,
        description: postData.findPostById.post.description,
        slug: postData.findPostById.post.slug,
      } as PostOptionsProps;
    }
    return undefined;
  }, [communitySlug, id, postData]);

  const [saveStatus] = useSavePostBuilder<PostOptionsProps>(
    initialPostData,
    postOptions,
    updatePostOptionsCallback,
  );

  useEffect(() => {
    setSaveState(saveStatus);
  }, [saveStatus]);

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

      const postDataExclusive = postData.findPostById.post.exclusive;

      const exclusive = (): boolean => {
        switch (postDataExclusive) {
          case true:
            return true;
          case false:
            return false;
          default:
            return true;
        }
      };

      setPostOptions({
        communitySlug,
        postId: id,
        exclusive: exclusive(),
        description: postData.findPostById.post.description,
        slug: postData.findPostById.post.slug,
      });
    }
  }, [communitySlug, id, postData]);

  const getEditorSaveState = useCallback((state: 'saved' | 'saving'): void => {
    setSaveState(state);
  }, []);

  const publishPost = useCallback(async () => {
    const result = await updatePost({
      variables: {
        communitySlug,
        postId: id,
        post: {
          status: PostStatus.Published,
        },
      },
    });

    const postURL = `/${communitySlug}/post/${result.data?.updatePost?.post?.slug}`;

    router.push(postURL);
  }, [updatePost, communitySlug, id, router]);

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
                  value={postOptions.description || ''}
                  onChange={e =>
                    setPostOptions(state => ({
                      ...state,
                      description: e.target.value,
                    }))
                  }
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
                  value={postOptions.slug || ''}
                  onChange={e =>
                    setPostOptions(state => ({
                      ...state,
                      slug: e.target.value,
                    }))
                  }
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
                    isOn={postOptions.exclusive ? postOptions.exclusive : false}
                    handleToggle={() =>
                      setPostOptions(state => ({
                        ...state,
                        exclusive: !state.exclusive,
                      }))
                    }
                  />
                </PublishOptionSwitch>
              </PublishOptionInput>

              <PublishOptionInput>
                <p>
                  Selecione uma imagem de capa para seu post:{' '}
                  <small>(melhor formato: 352x198px)</small>
                </p>

                <PostCover communitySlug={communitySlug} postId={id} />
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
