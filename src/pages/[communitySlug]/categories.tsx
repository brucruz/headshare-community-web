import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useGetCommunityTagsDataQuery } from '../../generated/graphql';
import { HomeContent } from '../../styles/pages/CommunityHome';
import {
  CategoriesButtons,
  CategoriesContainer,
  CategoryButton,
} from '../../styles/pages/Categories';
import CommunityPageTemplate from '../../components/templates/CommunityPageTemplate';
import { withApollo } from '../../utils/withApollo';

function Categories(): JSX.Element {
  const router = useRouter();
  const { communitySlug } = router.query as { communitySlug: string };

  const { data, loading, error } = useGetCommunityTagsDataQuery({
    variables: { slug: communitySlug },
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
      backButton
    >
      <HomeContent>
        <CategoriesContainer>
          <h4>Categorias</h4>

          <CategoriesButtons>
            {community &&
              community.tags.map(tag => (
                <NextLink
                  href={`/${community && community.slug}/category/${tag.slug}`}
                >
                  <CategoryButton>
                    <p>{tag.title}</p>
                    <Image
                      src="https://headshare.s3.amazonaws.com/assets/arrow_right.png"
                      height={24}
                      width={24}
                    />
                  </CategoryButton>
                </NextLink>
              ))}
          </CategoriesButtons>
        </CategoriesContainer>
      </HomeContent>
    </CommunityPageTemplate>
  );
}

export default withApollo({ ssr: true })(Categories);

// export const getStaticPaths: GetStaticPaths = async () => {
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query<
//     GetCommunitiesSlugsQuery,
//     GetCommunitiesSlugsQueryVariables
//   >({
//     query: GetCommunitiesSlugsDocument,
//   });

//   const { errors, communities } = data.communities;

//   if (errors) {
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }

//   if (!communities) {
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }

//   const paths = communities.map(community => ({
//     params: {
//       communitySlug: community.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps<
//   CategoriesProps,
//   { communitySlug: string }
// > = async context => {
//   const apolloClient = initializeApollo();

//   if (context.params) {
//     const { communitySlug } = context.params;

//     try {
//       const { data } = await apolloClient.query<
//         GetCommunityTagsDataQuery,
//         GetCommunityTagsDataQueryVariables
//       >({
//         query: GetCommunityTagsDataDocument,
//         variables: { slug: communitySlug },
//       });

//       const { errors, community } = data.community;

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

//       if (!community) {
//         return {
//           redirect: {
//             destination: '/',
//             statusCode: 301,
//           },
//         };
//       }

//       return {
//         props: {
//           community,
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
