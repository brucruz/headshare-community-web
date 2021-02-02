import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import Button from '../../../components/Button';
import LikeCommentCount from '../../../components/LikeCommentCount';
import CommunityPageTemplate from '../../../components/templates/CommunityPageTemplate';
import {
  Tag,
  CommunityTagPostsDocument,
  CommunityTagPostsQuery,
  CommunityTagPostsQueryVariables,
  CommonCommunityFragment,
  Post,
} from '../../../generated/graphql';
import { initializeApollo } from '../../../lib/apolloClient';
import {
  PostCountContainer,
  TagPostCard,
  TagPostsContainer,
  ImageContainer,
  CardContent,
  AllCategoriesButtonContainer,
} from '../../../styles/pages/TagPosts';

interface TagPostsProps {
  tag: Pick<Tag, 'title' | 'description' | 'postCount' | 'slug'> & {
    posts: Array<
      {
        __typename?: 'Post';
      } & Pick<Post, 'title' | 'description' | 'likes' | 'slug'>
    >;
    community: {
      __typename?: 'Community';
    } & CommonCommunityFragment;
  };
}

interface TagPostProps {
  title: string;
  image?: string;
  description?: string | null;
  exclusive?: boolean;
  liked?: boolean;
  likes?: number;
  comments?: number;
  href: string | UrlObject;
}

export const TagPost: React.FC<TagPostProps> = ({
  title,
  image,
  description,
  exclusive = false,
  liked = false,
  likes = 0,
  comments = 0,
  href,
}) => {
  'hello';

  return (
    <NextLink href={href} passHref>
      <TagPostCard>
        <ImageContainer>
          {image && <Image src={image} height={530} width={940} />}
        </ImageContainer>

        <CardContent exclusive={exclusive}>
          {exclusive && <h5>Exclusivo</h5>}

          <h4>{title}</h4>
          {description && <p>{description}</p>}

          <LikeCommentCount liked={liked} likes={likes} comments={comments} />
        </CardContent>
      </TagPostCard>
    </NextLink>
  );
};

const TagPosts: React.FC<TagPostsProps> = ({ tag }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  return (
    <CommunityPageTemplate
      community={tag.community}
      title={tag.title}
      subtitle={tag.description}
      backButton
    >
      <PostCountContainer>
        <h5>
          {tag.postCount === 1
            ? `${tag.postCount} post encontrado`
            : `${tag.postCount} posts encontrados`}
        </h5>
      </PostCountContainer>

      <TagPostsContainer>
        {tag.posts.map(post => (
          <TagPost
            key={post.slug}
            title={post.title || 'Título'}
            description={post.description}
            exclusive={false}
            liked
            likes={0}
            comments={10}
            href={`/${tag.community.slug}/post/${post.slug}`}
          />
        ))}
      </TagPostsContainer>

      <NextLink href={`/${tag.community.slug}/categories`}>
        <AllCategoriesButtonContainer>
          <Button text="Ver todas as categorias" priority="tertiary" stretch />
        </AllCategoriesButtonContainer>
      </NextLink>
    </CommunityPageTemplate>
  );
};

export default TagPosts;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<
  TagPostsProps,
  { communitySlug: string; tagSlug: string }
> = async context => {
  const apolloClient = initializeApollo();

  if (context.params) {
    const { communitySlug, tagSlug } = context.params;

    console.log(context.params);

    try {
      const { data } = await apolloClient.query<
        CommunityTagPostsQuery,
        CommunityTagPostsQueryVariables
      >({
        query: CommunityTagPostsDocument,
        variables: { data: { communitySlug, tagSlug } },
      });

      const { errors, tag } = data.findTagBySlugs;

      if (errors) {
        const { message } = errors[0];

        if (message === 'No community found with this slug') {
          return {
            redirect: {
              destination: '/',
              statusCode: 301,
            },
          };
        }
      }

      if (!tag) {
        return {
          redirect: {
            destination: '/',
            statusCode: 301,
          },
        };
      }

      return {
        props: {
          tag,
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
