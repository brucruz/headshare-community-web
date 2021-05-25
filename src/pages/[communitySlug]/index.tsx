/* eslint-disable no-underscore-dangle */
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  MdAddCircle,
  MdEdit,
  MdKeyboardArrowRight,
  MdPhoto,
} from 'react-icons/md';
import { UrlObject } from 'url';
import Button from '../../components/Button';
// import LikeCommentCount from '../../components/LikeCommentCount';
import CommunityPageTemplate from '../../components/templates/CommunityPageTemplate';
import {
  PostStatus,
  useCreatePostMutation,
  useGetCommunityHomeDataQuery,
} from '../../generated/graphql';
import {
  // CategoriesDetailContainer,
  CategoriesPosts,
  CategoryContent,
  CategoryPost,
  CategoryPostImagePlaceholder,
  CategoryPosts,
  EmptyHighlights,
  EmptyPost,
  HomeContent,
  HomeTitle,
  PostContent,
  SeeMoreButton,
} from '../../styles/pages/CommunityHome';
import { withApollo } from '../../utils/withApollo';
import { useAuth } from '../../hooks/useAuth';
import { SEO } from '../../components/SEO';
import { ConfirmAddressModal } from '../../components/ConfirmAddressModal';

interface PostCardProps {
  title: string;
  thumbnail?: string | null;
  exclusive?: boolean | null;
  liked?: boolean;
  likes: number;
  comments: number;
  href: string | UrlObject;
}

function PostCard({
  title,
  thumbnail,
  exclusive = false,
  liked = false,
  likes,
  comments,
  href,
}: PostCardProps): JSX.Element {
  return (
    <NextLink href={href} passHref>
      <CategoryPost>
        {thumbnail && <img src={thumbnail} alt="post-card" />}

        {!thumbnail && (
          <CategoryPostImagePlaceholder>
            <MdPhoto />
          </CategoryPostImagePlaceholder>
        )}

        <PostContent exclusive={exclusive}>
          {exclusive && <h5>Exclusivo</h5>}
          <p>{title}</p>

          {/* <LikeCommentCount liked={liked} likes={likes} comments={comments} /> */}
        </PostContent>
      </CategoryPost>
    </NextLink>
  );
}

function CommunityHome(): JSX.Element {
  const router = useRouter();
  const { communitySlug } = router.query as { communitySlug: string };

  const { isCreator } = useAuth();

  const { data, loading } = useGetCommunityHomeDataQuery({
    variables: {
      slug: communitySlug,
      postsStatus: PostStatus.Published,
      postsPerTag: 10,
    },
  });

  const [createPost] = useCreatePostMutation();

  const community = data && data.community && data.community.community;

  // if ((!loading && !data) || !community) {
  //   return (
  //     <div>
  //       <div>you got query failed for some reason</div>
  //       <div>{error?.message}</div>
  //     </div>
  //   );
  // }

  if ((!data && loading) || !community) {
    return <div />;
  }

  async function handleCreatePost(): Promise<void> {
    const result = await createPost({
      variables: {
        communitySlug,
        post: {},
      },
    });

    if (result.data) {
      if (result.data.createPost.post) {
        const id = result.data?.createPost.post?._id;

        router.push(`/${communitySlug}/draft?id=${id.toString()}`);
      }
    }
  }

  return (
    <CommunityPageTemplate
      community={community}
      title={community && community.title}
      subtitle={community && community.tagline}
    >
      {/* Criar conteúdo personalizável SEO para página principal (geral)
        - imagem 200x200 e 400x400
        - descrição - geral

        Por post:
        - título
        - imagem: 200x200 e 400x400
        - descrição
      */}
      <SEO
        title={
          community.tagline
            ? `${community.title} | ${community.tagline}`
            : community.title || 'Headshare'
        }
        // description={} // Criar campo de description para SEO
        communityTitle={community.title}
        shouldExcludeTitleSuffix
      />

      <HomeContent>
        <HomeTitle>
          <div>
            <h2>Destaques</h2>
            {community &&
              community.highlightedTags.length === 0 &&
              isCreator && (
                <p>
                  Defina as categorias que aparecerão em destaque na página
                  inicial
                </p>
              )}
          </div>
          {isCreator && (
            <Button
              text="Editar"
              priority="secondary"
              onClick={() =>
                router.push(`/${communitySlug}/admin/categories/highlights`)
              }
            />
          )}
        </HomeTitle>

        <CategoriesPosts>
          {community && community.highlightedTags.length === 0 && isCreator && (
            <EmptyHighlights>
              <MdEdit />

              <p>Editar Destaques</p>
            </EmptyHighlights>
          )}

          {community &&
            community.highlightedTags.map(highlightedTag => {
              if (highlightedTag.tag.postCount > 0) {
                return (
                  <CategoryContent key={highlightedTag.tag.slug}>
                    <h4>
                      <NextLink
                        href={`/${community.slug}/category/${highlightedTag.tag.slug}`}
                        passHref
                      >
                        <a>{highlightedTag.tag.title}</a>
                      </NextLink>
                    </h4>
                    <h5>
                      {highlightedTag.tag.postCount === 1
                        ? `${highlightedTag.tag.postCount} post`
                        : `${highlightedTag.tag.postCount} posts`}
                    </h5>

                    <CategoryPosts>
                      {highlightedTag.tag.postCount <= 10 ? (
                        highlightedTag.tag.posts.posts.map(post => (
                          <PostCard
                            key={post.slug}
                            title={post.title || 'Draft'}
                            liked
                            comments={2}
                            exclusive={post.exclusive}
                            thumbnail={post.mainMedia?.thumbnailUrl}
                            likes={post.likes || 0}
                            href={`/${community.slug}/post/${post.slug}`}
                          />
                        ))
                      ) : (
                        <SeeMoreButton>
                          <MdKeyboardArrowRight />
                          <h4>ver mais</h4>
                        </SeeMoreButton>
                      )}
                    </CategoryPosts>
                  </CategoryContent>
                );
              }

              return (
                <>
                  {isCreator && (
                    <CategoryContent key={highlightedTag.tag.slug}>
                      <h4>
                        <NextLink
                          href={`/${community.slug}/category/${highlightedTag.tag.slug}`}
                          passHref
                        >
                          <a>{highlightedTag.tag.title}</a>
                        </NextLink>
                      </h4>
                      <h5>
                        {highlightedTag.tag.postCount === 1
                          ? `${highlightedTag.tag.postCount} post`
                          : `${highlightedTag.tag.postCount} posts`}
                      </h5>

                      <CategoryPosts>
                        <EmptyPost onClick={handleCreatePost}>
                          <MdAddCircle />

                          <p>Criar Post</p>
                        </EmptyPost>
                      </CategoryPosts>
                    </CategoryContent>
                  )}
                </>
              );
            })}
        </CategoriesPosts>

        {/* <NextLink href={`/${community && community.slug}/categories`}>
          <CategoriesDetailContainer>
            <Button
              priority="tertiary"
              text="Ver todas as categorias"
              stretch
            />
          </CategoriesDetailContainer>
        </NextLink> */}
      </HomeContent>
    </CommunityPageTemplate>
  );
}

export default withApollo({ ssr: true })(CommunityHome);
