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
    } | null;
    banner?: {
      url: string;
    } | null;
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
          const commRole = userData.me.user.roles.find(
            role => role.community.slug === community.slug,
          )?.role;

          if (commRole === RoleOptions.Creator) {
            setIsCreator(true);
          } else if (commRole === RoleOptions.Member) {
            setIsMember(true);
          }
        }
      }
    }
  }, [userData, community]);

  const handleMediaUpload = useCallback(
    async (file: File, communitySlug: string) => {
      const filename = formatS3Filename(file.name, communitySlug);

      const { data: uploadData } = await uploadImage({
        variables: {
          communitySlug,
          imageData: {
            format: MediaFormat.Image,
            file: {
              name: filename.toString(),
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

        const avatarId =
          community && (await handleMediaUpload(file, community.slug));

        const { data: avatarData } = await updateAvatar({
          variables: {
            communityId: community._id,
            avatarId,
          },
        });

        console.log('avatarData: ', avatarData);

        if (
          avatarData &&
          avatarData.updateCommunity &&
          avatarData.updateCommunity.community &&
          avatarData.updateCommunity.community.avatar
        ) {
          const { url } = avatarData.updateCommunity.community.avatar;

          setAvatarUrl(url);
        }
      }
    },
    [community, handleMediaUpload, updateAvatar],
  );

  return (
    <>
      <Header
        communityTitle={community ? community.title : 'Headshare'}
        communitySlug={community && community.slug}
      />
      <BannerContainer>
        {((community && community.banner?.url) || bannerUrl) && (
          <img
            src={(community && community.banner?.url) || bannerUrl}
            alt="banner"
          />
        )}

        {isCreator && community && !community.banner?.url && !bannerUrl && (
          <label htmlFor="banner-input">
            <MdAddAPhoto />

            <input
              id="banner-input"
              type="file"
              onChange={handleBannerSelect}
            />
          </label>
        )}

        {!isCreator && community && !community.banner?.url && (
          <label>
            <MdPhoto />
          </label>
        )}

        <AvatarHeader>
          <Avatar>
            {((community && community.avatar?.url) || avatarUrl) && (
              <img
                src={(community && community.avatar?.url) || avatarUrl}
                alt="avatar"
              />
            )}

            {isCreator && community && !community.avatar?.url && !avatarUrl && (
              <label htmlFor="avatar-input">
                <MdAddAPhoto />

                <input
                  id="avatar-input"
                  type="file"
                  onChange={handleAvatarSelect}
                />
              </label>
            )}

            {!isCreator && community && !community.avatar?.url && (
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

        {community && community.memberCount && (
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
        author={`${community ? community.creator.name : 'Headshare'} ${
          community && community.creator.surname
            ? community.creator.surname
            : ''
        }`}
        communityTitle={community ? community.title : 'Headshare'}
      />
    </>
  );
};

export default CommunityPageTemplate;
