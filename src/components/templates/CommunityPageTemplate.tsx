/* eslint-disable no-underscore-dangle */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MdAddAPhoto, MdPhoto } from 'react-icons/md';
import Footer from '../Footer';
import Header from '../Header';
import Button from '../Button';
import {
  BannerContainer,
  AvatarHeader,
  Avatar,
  MemberCount,
  ChildrenContainer,
} from '../../styles/components/templates/CommunityPageTemplate';
import TitleSubtitle from '../TitleSubtitle';
import {
  MediaFormat,
  RoleOptions,
  useCommunityPageTemplateMeQuery,
  useUpdateCommunityBannerMutation,
  useUploadImageMutation,
  useUpdateCommunityAvatarMutation,
} from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { formatS3Filename, uploadToS3 } from '../../lib/s3';

interface CommunityPageTemplateProps {
  childrenMaxWidth?: number;
  title: string;
  subtitle?: string | null;
  backButton?: boolean;
  community: {
    _id: string;
    title: string;
    slug: string;
    avatar?: {
      url: string;
    };
    banner?: {
      url: string;
    };
    creator: {
      name: string;
      surname?: string | null;
    };
    memberCount?: number;
  };
}

const CommunityPageTemplate: React.FC<CommunityPageTemplateProps> = ({
  title,
  subtitle,
  backButton = false,
  community,
  children,
  childrenMaxWidth = 940,
}) => {
  const [isCreator, setIsCreator] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | undefined>();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  const { data: userData } = useCommunityPageTemplateMeQuery({
    skip: isServer(),
  });

  const [uploadImage] = useUploadImageMutation();
  const [updateBanner] = useUpdateCommunityBannerMutation();
  const [updateAvatar] = useUpdateCommunityAvatarMutation();

  useEffect(() => {
    if (userData) {
      if (userData.me) {
        if (userData.me.user) {
          const commRole = userData.me.user.roles.find(role => role.community)
            ?.role;

          if (commRole === RoleOptions.Creator) {
            setIsCreator(true);
          } else if (commRole === RoleOptions.Member) {
            setIsMember(true);
          }
        }
      }
    }
  }, [userData]);

  const handleMediaUpload = useCallback(
    async (file: File, communitySlug: string) => {
      const filename = formatS3Filename(file.name, communitySlug);

      const { data: uploadData } = await uploadImage({
        variables: {
          communitySlug,
          imageData: {
            format: MediaFormat.Image,
            file: {
              name: filename,
              type: file.type,
            },
          },
        },
      });

      if (
        uploadData &&
        uploadData.uploadImage &&
        uploadData.uploadImage.media
      ) {
        const { uploadLink } = uploadData.uploadImage.media;

        try {
          await uploadToS3(file, uploadLink);

          const mediaId = uploadData.uploadImage.media._id;

          return mediaId;
        } catch (err) {
          console.log(err);
        }
      }
    },
    [uploadImage],
  );

  const handleBannerSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];

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
        }
      }
    },
    [community, handleMediaUpload, updateBanner],
  );

  const handleAvatarSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];

        const avatarId = await handleMediaUpload(file, community.slug);

        const { data: bannerData } = await updateAvatar({
          variables: {
            communityId: community._id,
            avatarId,
          },
        });

        if (
          bannerData &&
          bannerData.updateCommunity &&
          bannerData.updateCommunity.community &&
          bannerData.updateCommunity.community.banner
        ) {
          const { url } = bannerData.updateCommunity.community.banner;

          setAvatarUrl(url);
        }
      }
    },
    [community, handleMediaUpload, updateAvatar],
  );

  return (
    <>
      <Header communityTitle={community.title} communitySlug={community.slug} />
      <BannerContainer>
        {(community.banner?.url || bannerUrl) && (
          <img src={community.banner?.url || bannerUrl} alt="banner" />
        )}

        {isCreator && !community.banner?.url && !bannerUrl && (
          <label htmlFor="banner-input">
            <MdAddAPhoto />

            <input
              id="banner-input"
              type="file"
              onChange={handleBannerSelect}
            />
          </label>
        )}

        {!isCreator && !community.banner?.url && (
          <label>
            <MdPhoto />
          </label>
        )}

        <AvatarHeader>
          <Avatar>
            {(community.avatar?.url || avatarUrl) && (
              <img src={community.avatar?.url || avatarUrl} alt="avatar" />
            )}

            {isCreator && !community.avatar?.url && !avatarUrl && (
              <label htmlFor="avatar-input">
                <MdAddAPhoto />

                <input
                  id="avatar-input"
                  type="file"
                  onChange={handleAvatarSelect}
                />
              </label>
            )}

            {!isCreator && !community.avatar?.url && (
              <label>
                <MdPhoto />
              </label>
            )}
          </Avatar>

          {!isCreator && !isMember && (
            <Button text="Seguindo" priority="secondary" />
          )}

          {isMember && <Button text="Seguir" priority="secondary" />}
        </AvatarHeader>

        {community.memberCount && (
          <MemberCount>
            <h5>{community.memberCount} membros</h5>
          </MemberCount>
        )}

        <TitleSubtitle title={title} subtitle={subtitle} />
      </BannerContainer>

      <ChildrenContainer maxWidth={childrenMaxWidth}>
        {children}
      </ChildrenContainer>

      <Footer
        author={`${community.creator.name} ${
          community.creator.surname ? community.creator.surname : ''
        }`}
        communityTitle={community.title}
      />
    </>
  );
};

export default CommunityPageTemplate;