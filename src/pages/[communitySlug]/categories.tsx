import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { initializeApollo } from '../../lib/apolloClient';
import {
  Tag,
  GetCommunitiesSlugsDocument,
  GetCommunitiesSlugsQuery,
  GetCommunitiesSlugsQueryVariables,
  GetCommunityTagsDataDocument,
  GetCommunityTagsDataQuery,
  GetCommunityTagsDataQueryVariables,
  CommonCommunityFragment,
  Maybe,
  Media,
} from '../../generated/graphql';
import { HomeContent } from '../../styles/pages/Home';
import {
  CategoriesButtons,
  CategoriesContainer,
  CategoryButton,
} from '../../styles/pages/Categories';
import CommunityPageTemplate from '../../components/templates/CommunityPageTemplate';

interface CategoriesProps {
  community: {
    __typename?: 'Community';
  } & {
    tags: Array<
      {
        __typename?: 'Tag';
      } & Pick<Tag, 'title' | 'slug'>
    >;
    banner?: Maybe<{ __typename?: 'Media' } & Pick<Media, 'url'>>;
    avatar?: Maybe<{ __typename?: 'Media' } & Pick<Media, 'url'>>;
  } & CommonCommunityFragment;
}

const Categories: React.FC<CategoriesProps> = ({ community }) => (
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

export default Categories;

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
  CategoriesProps,
  { communitySlug: string }
> = async context => {
  const apolloClient = initializeApollo();

  if (context.params) {
    const { communitySlug } = context.params;

    try {
      const { data } = await apolloClient.query<
        GetCommunityTagsDataQuery,
        GetCommunityTagsDataQueryVariables
      >({
        query: GetCommunityTagsDataDocument,
        variables: { slug: communitySlug },
      });

      const { errors, community } = data.community;

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
