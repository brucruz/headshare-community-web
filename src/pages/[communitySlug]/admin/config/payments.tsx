import { useRouter } from 'next/router';
import Button from '../../../../components/Button';
import { SEO } from '../../../../components/SEO';
import { AdminPageTemplate } from '../../../../components/templates/AdminPageTemplate';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import {
  AdminConfigPaymentsContainer,
  ConfigPaymentsTitle,
  PaymentProviderConnectCard,
} from '../../../../styles/pages/AdminConfigPayments';
import { withApollo } from '../../../../utils/withApollo';
import StripeLogo from '../../../../assets/stripe-logo.svg';

function AdminConfigPayments(): JSX.Element {
  const router = useRouter();
  const { isCreator } = useAuth();
  const { addSnackbar } = useSnackbar();

  const { communitySlug } = router.query as { communitySlug: string };

  // const { loading, data, error } = useCommunityAdminConfigPayments({
  //   variables: {
  //     slug: communitySlug,
  //   },
  // });

  // const community = data && data.community && data.community.community;

  // if ((!data && loading) || !community) {
  //   return <div />;
  // }

  // if (isCreator === false) {
  //   router.push(`/${communitySlug}`);
  // }

  return (
    <AdminPageTemplate
      communitySlug={communitySlug}
      communityTitle="Nihongo"
      // communityTitle={community.title}
      communityAuthor="Bruno Cruz"
      // communityAuthor={`${community.creator.name} ${
      //   community.creator.surname ? community.creator.surname : ''
      // }`}
      pageTitle="Configurações"
      sideMenu={[]}
      tabs={[
        {
          text: 'Principais',
          url: `/${communitySlug}/admin/config`,
        },
        {
          text: 'Branding',
          url: `/${communitySlug}/admin/config/branding`,
        },
        {
          text: 'Pagamentos',
          active: true,
        },
      ]}
    >
      <SEO
        title="Pagamentos | Configurações | Gerenciar a comunidade"
        // description={} // Criar campo de description para SEO
        // communityTitle={community?.title}
      />

      <AdminConfigPaymentsContainer>
        <ConfigPaymentsTitle>
          <h2>Pagamentos</h2>

          <p>
            Conecte seus dados bancários para começar a receber pagamentos da
            sua comunidade.
          </p>
        </ConfigPaymentsTitle>

        <PaymentProviderConnectCard>
          <div>
            <StripeLogo />
          </div>

          <div>
            <h4>Stripe</h4>

            <p>
              Aceitar cartão de crédito e receber pagamentos na sua conta
              bancária.
            </p>
          </div>

          <div>
            <Button text="Conectar" size="small" />
          </div>
        </PaymentProviderConnectCard>
      </AdminConfigPaymentsContainer>
    </AdminPageTemplate>
  );
}

export default withApollo({ ssr: false })(AdminConfigPayments);
