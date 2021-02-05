import { Maybe } from 'graphql/jsutils/Maybe';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowRight, MdPhoto } from 'react-icons/md';
import { UrlObject } from 'url';
import Button from '../../components/Button';
import LikeCommentCount from '../../components/LikeCommentCount';
import CommunityPageTemplate from '../../components/templates/CommunityPageTemplate';
import {
  Community,
  Tag,
  Post,
  User,
  GetCommunitiesSlugsDocument,
  GetCommunitiesSlugsQuery,
  GetCommunitiesSlugsQueryVariables,
  GetCommunityHomeDataDocument,
  GetCommunityHomeDataQuery,
  GetCommunityHomeDataQueryVariables,
  Media,
  PostStatus,
} from '../../generated/graphql';
import { initializeApollo } from '../../lib/apolloClient';
import {
  CategoriesDetailContainer,
  CategoriesPosts,
  CategoryContent,
  CategoryPost,
  CategoryPostImagePlaceholder,
  CategoryPosts,
  HomeContent,
  PostContent,
  SeeMoreButton,
} from '../../styles/pages/Home';

interface HomeProps {
  community: Pick<
    Community,
    | '_id'
    | 'logo'
    | 'title'
    | 'slug'
    | 'description'
    | 'followersCount'
    | 'membersCount'
  > & {
    banner?: Maybe<{ __typename?: 'Media' } & Pick<Media, 'url'>>;
    avatar?: Maybe<{ __typename?: 'Media' } & Pick<Media, 'url'>>;
    tags: Array<
      { __typename?: 'Tag' } & Pick<Tag, 'title' | 'slug' | 'postCount'> & {
          posts: Array<
            { __typename?: 'Post' } & Pick<
              Post,
              'title' | 'slug' | 'likes' | 'exclusive'
            > & {
                mainMedia?: Maybe<
                  { __typename?: 'Media' } & Pick<Media, 'thumbnailUrl'>
                >;
              }
          >;
        }
    >;
    creator: { __typename?: 'User' } & Pick<User, 'name' | 'surname'>;
  };
}

interface PostCardProps {
  title: string;
  thumbnail?: string | null;
  exclusive?: boolean | null;
  liked?: boolean;
  likes: number;
  comments: number;
  href: string | UrlObject;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  thumbnail,
  exclusive = false,
  liked = false,
  likes,
  comments,
  href,
}) => (
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

const Home: React.FC<HomeProps> = ({ community }) => {
  const router = useRouter();

  if (router.isFallback) {
    <h1>Carregando...</h1>;
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
            community.tags.map(tag => {
              if (tag.postCount > 0) {
                return (
                  <CategoryContent key={tag.slug}>
                    <h4>
                      <NextLink
                        href={`/${community.slug}/${tag.slug}`}
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
                      {tag.posts.map(post => (
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
                      ))}
                      {tag.posts.length > 5 && (
                        <SeeMoreButton>
                          <MdKeyboardArrowRight />
                          <h4>ver mais</h4>
                        </SeeMoreButton>
                      )}
                    </CategoryPosts>
                  </CategoryContent>
                );
              }
              return undefined;
            })}
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
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<
    GetCommunitiesSlugsQuery,
    GetCommunitiesSlugsQueryVariables
  >({
    query: GetCommunitiesSlugsDocument,
  });

  const { errors, communities } = data.communities;

  if (errors) {
    return {
      paths: [],
      fallback: true,
    };
  }

  if (!communities) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = communities.map(community => ({
    params: {
      communitySlug: community.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  HomeProps,
  { communitySlug: string }
> = async context => {
  const apolloClient = initializeApollo();

  if (context.params) {
    const { communitySlug } = context.params;

    try {
      const { data } = await apolloClient.query<
        GetCommunityHomeDataQuery,
        GetCommunityHomeDataQueryVariables
      >({
        query: GetCommunityHomeDataDocument,
        variables: { slug: communitySlug, postsStatus: PostStatus.Published },
      });

      const { errors, community } = data.community;

      if (errors) {
        const { message } = errors[0];

        if (message === 'No community found with this slug') {
          return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          };
        }
      }

      if (!community) {
        return {
          redirect: {
            destination: '/',
            statusCode: 301,
          },
        };
      }

      return {
        props: {
          community,
        },
      };
    } catch (err) {
      console.log(err);
    }
  }
  return {
    notFound: true,
  };
};
