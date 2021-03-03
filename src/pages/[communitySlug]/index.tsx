import { FiAlertCircle } from 'react-icons/fi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowRight, MdPhoto } from 'react-icons/md';
import { UrlObject } from 'url';
import Button from '../../components/Button';
import LikeCommentCount from '../../components/LikeCommentCount';
import CommunityPageTemplate from '../../components/templates/CommunityPageTemplate';
import {
  PostStatus,
  useGetCommunityHomeDataQuery,
} from '../../generated/graphql';
import {
  CategoriesDetailContainer,
  CategoriesPosts,
  CategoryContent,
  CategoryPost,
  CategoryPostImagePlaceholder,
  CategoryPosts,
  EmptyCategory,
  HomeContent,
  PostContent,
  SeeMoreButton,
} from '../../styles/pages/CommunityHome';
import { withApollo } from '../../utils/withApollo';

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

          <LikeCommentCount liked={liked} likes={likes} comments={comments} />
        </PostContent>
      </CategoryPost>
    </NextLink>
  );
}

function CommunityHome(): JSX.Element {
  const router = useRouter();
  const { communitySlug } = router.query as { communitySlug: string };

  const { data, error, loading } = useGetCommunityHomeDataQuery({
    variables: { slug: communitySlug, postsStatus: PostStatus.Published },
  });

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

  return (
    <CommunityPageTemplate
      community={community}
      title={community && community.title}
      subtitle={community && community.description}
    >
      <HomeContent>
        <CategoriesPosts>
          {community &&
            community.tags.map(tag => (
              <CategoryContent key={tag.slug}>
                <h4>
                  <NextLink
                    href={`/${community.slug}/category/${tag.slug}`}
                    passHref
                  >
                    <a>{tag.title}</a>
                  </NextLink>
                </h4>
                <h5>
                  {tag.postCount === 1
                    ? `${tag.postCount} post`
                    : `${tag.postCount} posts`}
                </h5>

                <CategoryPosts>
                  {tag.postCount === 0 && (
                    <EmptyCategory>
                      <div>
                        <FiAlertCircle />

                        <p>
                          Esta categoria ainda não tem nenhum post publicado
                        </p>
                      </div>
                    </EmptyCategory>
                  )}
                  {tag.postCount <= 10 ? (
                    tag.posts.map(post => (
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
            ))}
        </CategoriesPosts>

        <NextLink href={`/${community && community.slug}/categories`}>
          <CategoriesDetailContainer>
            <Button
              priority="tertiary"
              text="Ver todas as categorias"
              stretch
            />
          </CategoriesDetailContainer>
        </NextLink>
      </HomeContent>
    </CommunityPageTemplate>
  );
}

export default withApollo({ ssr: true })(CommunityHome);
