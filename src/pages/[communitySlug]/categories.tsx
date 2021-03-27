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
import { SEO } from '../../components/SEO';

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
      subtitle={community && community.tagline}
      backButton
    >
      <SEO
        title="Categorias"
        // description={} // Criar campo de description para SEO
        communityTitle={community?.title}
      />

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
