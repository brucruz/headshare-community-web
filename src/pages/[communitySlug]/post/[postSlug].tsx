/* eslint-disable react/no-danger */
import { format, parseISO } from 'date-fns';
import { Maybe } from 'graphql/jsutils/Maybe';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import ReactPlayer from 'react-player';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import LikeCommentCount from '../../../components/LikeCommentCount';
import TitleSubtitle from '../../../components/TitleSubtitle';
import {
  Community,
  CreatorNameFragment,
  GetPostsSlugsDocument,
  GetPostsSlugsQuery,
  GetPostsSlugsQueryVariables,
  Media,
  MediaFormat,
  Post,
  PostBySlugsDocument,
  PostBySlugsQuery,
  PostBySlugsQueryVariables,
  Tag,
  usePostBySlugsQuery,
} from '../../../generated/graphql';
import { initializeApollo } from '../../../lib/apolloClient';
import {
  ImageVideoContainer,
  PostContainer,
  PostContentContainer,
  PostDateLikeComments,
} from '../../../styles/pages/PostContent';
import { withApollo } from '../../../utils/withApollo';

interface PostContentProps {
  post: Pick<
    Post,
    'title' | 'slug' | 'description' | 'content' | 'exclusive' | 'createdAt'
  > & {
    mainMedia?: Maybe<
      { __typename?: 'Media' } & Pick<Media, 'format' | 'url' | 'thumbnailUrl'>
    >;
    creator: {
      __typename?: 'User';
    } & CreatorNameFragment;
    tags: Array<
      {
        __typename?: 'Tag';
      } & Pick<Tag, 'title'>
    >;
    community: {
      __typename?: 'Community';
    } & Pick<Community, 'title' | 'slug'> & {
        creator: {
          __typename?: 'User';
        } & CreatorNameFragment;
      };
  };
}

function PostContent(): JSX.Element {
  const router = useRouter();
  const { postSlug, communitySlug } = router.query as {
    postSlug: string;
    communitySlug: string;
  };

  const { data, loading, error } = usePostBySlugsQuery({
    variables: { data: { communitySlug, postSlug } },
  });

  const post = data && data.findPostBySlugs && data.findPostBySlugs.post;

  if ((!loading && !data) || !post) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (!data && loading) {
    return <h1>Carregando...</h1>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const postedDate = useMemo(() => {
    const parsedDate = parseISO(post.createdAt);
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
  }, [post.createdAt]);

  return (
    <>
      <Header
        communitySlug={communitySlug}
        communityTitle={post.community.title}
      />

      <div style={{ height: '56px' }} />

      <ImageVideoContainer>
        {post.mainMedia?.format === MediaFormat.Video && (
          <ReactPlayer
            url={post.mainMedia?.url}
            controls
            muted={false}
            light
            height="100%"
            width="100%"
          />
        )}
      </ImageVideoContainer>

      <PostContainer>
        <TitleSubtitle
          backButtonUrl={`/${communitySlug}`}
          title={post.title || 'Título'}
          subtitle={post.description}
        />

        <PostDateLikeComments>
          <h5>Postado em: {postedDate}</h5>

          <LikeCommentCount likes={0} comments={10} />
        </PostDateLikeComments>

        <PostContentContainer>
          {post.content && (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </PostContentContainer>

        <Footer
          author={`${post.creator.name} ${
            post.creator.surname ? post.creator.surname : ''
          }`}
          communityTitle={post.community.title}
          shareable
        />
      </PostContainer>
    </>
  );
}

export default withApollo({ ssr: true })(PostContent);

// export const getStaticPaths: GetStaticPaths = async () => {
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query<
//     GetPostsSlugsQuery,
//     GetPostsSlugsQueryVariables
//   >({
//     query: GetPostsSlugsDocument,
//   });

//   const { errors, posts } = data.allPosts;

//   if (errors) {
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }

//   if (!posts) {
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }

//   const paths = posts.map(post => ({
//     params: {
//       postSlug: post.slug || '',
//       communitySlug: post.community.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps<
//   PostContentProps,
//   { communitySlug: string; postSlug: string }
// > = async context => {
//   const apolloClient = initializeApollo();

//   if (context.params) {
//     const { communitySlug, postSlug } = context.params;

//     try {
//       const { data } = await apolloClient.query<
//         PostBySlugsQuery,
//         PostBySlugsQueryVariables
//       >({
//         query: PostBySlugsDocument,
//         variables: { data: { communitySlug, postSlug } },
//       });

//       const { errors, post } = data.findPostBySlugs;

//       if (errors) {
//         const { message } = errors[0];

//         if (message === 'No community found with this slug') {
//           return {
//             redirect: {
//               destination: '/',
//               statusCode: 301,
//             },
//           };
//         }
//       }

//       if (!post) {
//         return {
//           redirect: {
//             destination: '/',
//             statusCode: 301,
//           },
//         };
//       }

//       return {
//         props: {
//           post,
//         },
//       };
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return {
//     notFound: true,
//   };
// };
