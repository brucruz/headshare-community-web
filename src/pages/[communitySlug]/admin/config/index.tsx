/* eslint-disable no-underscore-dangle */
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import {
  useCommunityAdminConfigMainQuery,
  useUpdateCommunityConfigMainMutation,
} from '../../../../generated/graphql';
import { AdminPageTemplate } from '../../../../components/templates/AdminPageTemplate';
import { useAuth } from '../../../../hooks/useAuth';
import { withApollo } from '../../../../utils/withApollo';
import { ExplainedInput } from '../../../../components/ExplainedInput';
import {
  ConfigMainForm,
  ConfigMainInputWrapper,
  ConfigMainFormTitle,
} from '../../../../styles/pages/AdminConfigMain';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { SEO } from '../../../../components/SEO';

interface EditConfigMainVariables {
  title: string;
  tagline: string;
  description: string;
}

function AdminConfigMain(): JSX.Element {
  const router = useRouter();
  const { isCreator } = useAuth();
  const { addSnackbar } = useSnackbar();

  const { communitySlug } = router.query as { communitySlug: string };

  const { loading, data, error } = useCommunityAdminConfigMainQuery({
    variables: {
      slug: communitySlug,
    },
  });

  const [updateCommunity] = useUpdateCommunityConfigMainMutation();

  const community = data && data.community && data.community.community;

  const editConfigMain = useFormik<EditConfigMainVariables>({
    initialValues: {
      title: '',
      tagline: '',
      description: '',
    },
    onSubmit: async values => {
      if (community) {
        const { data: newCommunity } = await updateCommunity({
          variables: {
            id: community._id,
            updateData: {
              title: values.title,
              tagline: values.tagline,
              description: values.description,
            },
          },
        });

        newCommunity &&
          addSnackbar({
            message: 'Configurações atualizadas com sucesso',
          });

        !newCommunity &&
          addSnackbar({
            message: 'Erro ao salvar configuração, tente novamente',
          });

        if (!community) {
          addSnackbar({
            message: 'Tente novamente mais tarde',
          });
        }
      }
    },
  });

  useEffect(() => {
    community &&
      editConfigMain.setValues({
        title: community?.title || '',
        tagline: community?.tagline || '',
        description: community?.description || '',
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community]);

  if ((!data && loading) || !community) {
    return <div />;
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
      pageTitle="Configurações"
      sideMenu={[]}
      tabs={[
        {
          text: 'Principais',
          active: true,
        },
        {
          text: 'Branding',
          url: `/${communitySlug}/admin/config/branding`,
        },
      ]}
      topButton={{
        text: 'Salvar',
        type: 'submit',
        form: 'edit-config-main',
        style: {
          paddingLeft: '11px',
          paddingRight: '11px',
        },
      }}
    >
      <SEO
        title="Configurações | Gerenciar a comunidade"
        // description={} // Criar campo de description para SEO
        communityTitle={community?.title}
      />

      <ConfigMainForm
        id="edit-config-main"
        onSubmit={editConfigMain.handleSubmit}
      >
        <ConfigMainFormTitle>
          <h2>Principais</h2>

          <p>
            As informações abaixo aparecerão em toda sua comunidade, tanto para
            os atuais membros como para potenciais.
          </p>
        </ConfigMainFormTitle>

        <ConfigMainInputWrapper>
          <ExplainedInput
            explanation={{
              title: 'Nome',
              description:
                'Altere o nome da comunidade, refletindo na página, nas comunicações por e-mail e em SEO',
            }}
            input={{
              id: 'title',
              name: 'title',
              placeholder: 'ex.: Comunidade do João',
              maxLength: 25,
              value: editConfigMain.values.title,
              onChange: e =>
                editConfigMain.setFieldValue('title', e.target.value),
            }}
          />
        </ConfigMainInputWrapper>

        <ConfigMainInputWrapper>
          <ExplainedInput
            explanation={{
              title: 'Slogan',
              description:
                'Frase curta para membros e visitantes possam rapidamente entender do que se trata sua comunidade',
            }}
            textarea={{
              id: 'tagline',
              name: 'tagline',
              placeholder:
                'ex.: Discussões sobre novidades de Marketing Digital',
              maxLength: 100,
              value: editConfigMain.values.tagline,
              onChange: e =>
                editConfigMain.setFieldValue('tagline', e.target.value),
            }}
          />
        </ConfigMainInputWrapper>

        <ConfigMainInputWrapper>
          <ExplainedInput
            explanation={{
              title: 'Descrição',
              description:
                'Conte para os visitantes um pouco sobre sua comunidade, em até 80 caracteres. Esta alteração irá refletir na página inicial e em SEO.',
            }}
            textarea={{
              id: 'description',
              name: 'description',
              placeholder:
                'ex.: Fundada por especialistas em Marketing Digital, nossa missão é trocar as informações mais atualizadas sobre o assunto.',
              maxLength: 1000,
              value: editConfigMain.values.description,
              onChange: e =>
                editConfigMain.setFieldValue('description', e.target.value),
            }}
          />
        </ConfigMainInputWrapper>
      </ConfigMainForm>
    </AdminPageTemplate>
  );
}

export default withApollo({ ssr: false })(AdminConfigMain);
