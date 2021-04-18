/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExplainedInput } from '../../../../components/ExplainedInput';
import { SEO } from '../../../../components/SEO';
import { AdminPageTemplate } from '../../../../components/templates/AdminPageTemplate';
import {
  MediaFormat,
  useCommunityAdminConfigBrandingQuery,
  useUpdateCommunityAvatarMutation,
  useUpdateCommunityBannerMutation,
  useUploadImageMutation,
} from '../../../../generated/graphql';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { formatS3Filename, uploadToS3 } from '../../../../lib/s3';
import {
  AdminConfigBrandingContainer,
  ConfigBrandingTitle,
  ConfigBrandingInputWrapper,
} from '../../../../styles/pages/AdminConfigBranding';
import { withApollo } from '../../../../utils/withApollo';

function AdminConfigBranding(): JSX.Element {
  const router = useRouter();
  const { isCreator } = useAuth();
  const { addSnackbar } = useSnackbar();

  const { communitySlug } = router.query as { communitySlug: string };

  const [bannerUrl, setBannerUrl] = useState<string | undefined>();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  const { loading, data, error } = useCommunityAdminConfigBrandingQuery({
    variables: {
      slug: communitySlug,
    },
  });

  const [uploadImage] = useUploadImageMutation();
  const [updateBanner] = useUpdateCommunityBannerMutation();
  const [updateAvatar] = useUpdateCommunityAvatarMutation();

  const community = data && data.community && data.community.community;

  useEffect(() => {
    setBannerUrl(community?.banner?.url);
    setAvatarUrl(community?.avatar?.url);
  }, [community]);

  if ((!data && loading) || !community) {
    return <div />;
  }

  if (isCreator === false) {
    router.push(`/${communitySlug}`);
  }

  async function handleMediaUpload(file: File, slug: string) {
    const filename = formatS3Filename(file.name, slug);

    const { data: uploadData } = await uploadImage({
      variables: {
        communitySlug: slug,
        imageData: {
          format: MediaFormat.Image,
          file: {
            name: filename.toString(),
            type: file.type,
          },
        },
      },
    });

    if (uploadData && uploadData.uploadImage && uploadData.uploadImage.media) {
      const { uploadLink } = uploadData.uploadImage.media;

      try {
        await uploadToS3(file, uploadLink);

        const mediaId = uploadData.uploadImage.media._id;

        return mediaId;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleBannerSelect(file: File): Promise<void> {
    if (community) {
      addSnackbar({
        message: 'Carregando novo arquivo...',
      });

      const bannerId = await handleMediaUpload(file, community.slug);

      const { data: bannerData } = await updateBanner({
        variables: {
          communityId: community._id,
          bannerId,
        },
      });

      if (
        bannerData &&
        bannerData.updateCommunity &&
        bannerData.updateCommunity.community &&
        bannerData.updateCommunity.community.banner
      ) {
        const { url } = bannerData.updateCommunity.community.banner;

        setBannerUrl(url);

        addSnackbar({
          message: 'Banner atualizado com sucesso',
        });
      } else {
        addSnackbar({
          message: 'Erro ao atualizar o banner. Tente novamente.',
        });
      }
    }
  }

  async function handleAvatarSelect(file: File): Promise<void> {
    if (community) {
      addSnackbar({
        message: 'Carregando novo arquivo...',
      });

      const avatarId =
        community && (await handleMediaUpload(file, community.slug));

      const { data: avatarData } = await updateAvatar({
        variables: {
          communityId: community._id,
          avatarId,
        },
      });

      if (
        avatarData &&
        avatarData.updateCommunity &&
        avatarData.updateCommunity.community &&
        avatarData.updateCommunity.community.avatar
      ) {
        const { url } = avatarData.updateCommunity.community.avatar;

        setAvatarUrl(url);

        addSnackbar({
          message: 'Banner atualizado com sucesso',
        });
      } else {
        addSnackbar({
          message: 'Erro ao atualizar o banner. Tente novamente.',
        });
      }
    }
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
          url: `/${communitySlug}/admin/config`,
        },
        {
          text: 'Branding',
          active: true,
        },
      ]}
    >
      <SEO
        title="Branding | Configurações | Gerenciar a comunidade"
        // description={} // Criar campo de description para SEO
        communityTitle={community?.title}
      />

      <AdminConfigBrandingContainer>
        <ConfigBrandingTitle>
          <h2>Branding</h2>

          <p>
            Configure a aparência da sua comunidade, tanto para membros como
            para visitantes.
          </p>
        </ConfigBrandingTitle>

        <ConfigBrandingInputWrapper>
          <ExplainedInput
            explanation={{
              title: 'Logo',
              description: 'Seu logo aparecerá na sua página',
            }}
            media={{
              id: 'avatar',
              name: 'avatar',
              getFile: handleAvatarSelect,
              fileType: 'image',
              currentFileUrl: avatarUrl,
            }}
          />
        </ConfigBrandingInputWrapper>

        <ConfigBrandingInputWrapper>
          <ExplainedInput
            explanation={{
              title: 'Banner',
              description: 'Seu banner aparecerá na sua página',
            }}
            media={{
              id: 'banner',
              name: 'banner',
              getFile: handleBannerSelect,
              fileType: 'image',
              currentFileUrl: bannerUrl,
            }}
          />
        </ConfigBrandingInputWrapper>
      </AdminConfigBrandingContainer>
    </AdminPageTemplate>
  );
}

export default withApollo({ ssr: false })(AdminConfigBranding);
