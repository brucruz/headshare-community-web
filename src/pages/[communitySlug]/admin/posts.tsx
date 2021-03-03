/* eslint-disable no-underscore-dangle */
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { PostCard } from '../../../components/PostCard';
import { AdminPageTemplate } from '../../../components/templates/AdminPageTemplate';
import {
  useCommunityAdminPostsQuery,
  useCreatePostMutation,
} from '../../../generated/graphql';
import { useAuth } from '../../../hooks/useAuth';
import { AdminPost, AdminPostList } from '../../../styles/pages/AdminPosts';
import { withApollo } from '../../../utils/withApollo';

function AdminPosts(): JSX.Element {
  const router = useRouter();

  const { communitySlug } = router.query as { communitySlug: string };

  const { loading, data, error } = useCommunityAdminPostsQuery({
    variables: {
      slug: communitySlug,
    },
  });

  const { isCreator } = useAuth();
  const [createPost] = useCreatePostMutation();

  const handleNewPost = useCallback(async () => {
    const result = await createPost({
      variables: {
        communitySlug,
        post: {},
      },
    });

    if (result.data) {
      if (result.data.createPost.post) {
        // eslint-disable-next-line no-underscore-dangle
        const id = result.data?.createPost.post?._id;

        router.push(`/${communitySlug}/draft?id=${id.toString()}`);
      }
    }
  }, [createPost, router, communitySlug]);

  if (!data && loading) {
    return <div />;
  }

  const community = data && data.community && data.community.community;

  if ((!loading && error) || !community) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (isCreator === false) {
    router.push(`/${communitySlug}`);
  }

  return (
    <AdminPageTemplate
      communitySlug={communitySlug}
      communityTitle={community.title}
      communityAuthor={`${community.creator.name} ${
        community.creator.surname ? community.creator.surname : ''
      }`}
      pageTitle="Posts"
      topButton={{
        text: 'Criar um post',
        onClick: handleNewPost,
      }}
      sideMenu={[
        {
          title: 'Posts',
          selected: true,
          path: `/${communitySlug}/admin/posts`,
        },
        {
          title: 'Categorias',
          path: `/${communitySlug}/admin/categories`,
        },
        {
          title: 'Configurações',
          path: `/${communitySlug}/admin/configuration`,
        },
      ]}
    >
      <AdminPostList>
        {community.posts.map(post => (
          <AdminPost key={post._id}>
            <PostCard
              id={post._id}
              title={post.title || 'Sem Título'}
              description={post.description}
              postSlug={post.slug || ''}
              status={post.status}
              communitySlug={communitySlug}
              image={post.mainMedia?.thumbnailUrl}
              isOwner={isCreator}
              liked
              comments={10}
              likes={100}
              exclusive={post.exclusive}
            />
          </AdminPost>
        ))}
      </AdminPostList>
    </AdminPageTemplate>
  );
}

export default withApollo({ ssr: false })(AdminPosts);
