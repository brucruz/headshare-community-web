/* eslint-disable react/no-danger */
import NextImage from 'next/image';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import ReactPlayer from 'react-player';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
// import LikeCommentCount from '../../../components/LikeCommentCount';
import TitleSubtitle from '../../../components/TitleSubtitle';
import { MediaFormat, usePostBySlugsQuery } from '../../../generated/graphql';
import {
  VideoContainer,
  PostContainer,
  PostContentContainer,
  PostDateLikeComments,
  MainMediaImage,
} from '../../../styles/pages/PostContent';
import { withApollo } from '../../../utils/withApollo';
import { SEO } from '../../../components/SEO';

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const postedDate = useMemo(() => {
    if (post) {
      const parsedDate = parseISO(post.createdAt);
      const formattedDate = format(parsedDate, 'dd/MM/yyyy');
      return formattedDate;
    }
    return '';
  }, [post]);

  // if ((!loading && !data) || !post) {
  //   return (
  //     <div>
  //       <div>you got query failed for some reason</div>
  //       <div>{error?.message}</div>
  //     </div>
  //   );
  // }

  if ((!data && loading) || !post) {
    return <div />;
  }

  return (
    <>
      <SEO
        title={post?.title ? post.title : 'Post'}
        // description={} // Criar campo de description para SEO
        communityTitle={post.community.title}
      />

      <Header
        communitySlug={communitySlug}
        communityTitle={post.community.title}
      />

      <div style={{ height: '56px' }} />

      {post.mainMedia?.format === MediaFormat.Video && (
        <VideoContainer>
          <ReactPlayer
            url={post.mainMedia?.url}
            controls
            muted={false}
            light
            height="100%"
            width="100%"
          />
        </VideoContainer>
      )}

      {post.mainMedia?.format === MediaFormat.Image && post.mainMedia.url && (
        <MainMediaImage>
          <NextImage
            src={post.mainMedia.url}
            layout="intrinsic"
            width={Number(post.mainMedia.width)}
            height={Number(post.mainMedia.height)}
          />
        </MainMediaImage>
      )}

      <PostContainer>
        <TitleSubtitle
          backButtonUrl={`/${communitySlug}`}
          title={post.title || 'Título'}
          subtitle={post.description}
        />

        <PostDateLikeComments>
          <h5>Postado em: {postedDate}</h5>

          {/* <LikeCommentCount likes={0} comments={10} /> */}
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
