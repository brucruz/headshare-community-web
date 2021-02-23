import NextLink from 'next/link';
import NextImage from 'next/image';
import { useMemo } from 'react';
import {
  PostCardContainer,
  PostCardImageContainer,
  PostCardContent,
  PostCardContentHeader,
  PostCardUpperContent,
  PostCardImagePlaceholder,
  LikeCommentStatusContainer,
  StatusBadgeContainer,
} from '../styles/components/PostCard';
import LikeCommentCount from './LikeCommentCount';
import { OptionsMenu } from './OptionsMenu';
import { MenuItemProps } from './MenuItem';
import { PostStatus } from '../generated/graphql';

interface PostCardProps {
  id: string;
  title: string;
  postSlug: string;
  communitySlug: string;
  image?: string | null;
  description?: string | null;
  exclusive?: boolean | null;
  status?: PostStatus | null;
  liked?: boolean;
  likes?: number;
  comments?: number;
  isOwner?: boolean;
}

interface PostStatusBadgeProps {
  status: PostStatus;
}

export function PostStatusBadge({ status }: PostStatusBadgeProps): JSX.Element {
  function statusMessage(postStatus: PostStatus): string {
    switch (postStatus) {
      case PostStatus.Published:
        return 'Publicado';

      case PostStatus.Scheduled:
        return 'Agendado';

      default:
        return 'Rascunho';
    }
  }

  return (
    <StatusBadgeContainer status={status}>
      <h5>{statusMessage(status)}</h5>
    </StatusBadgeContainer>
  );
}

export function PostCard({
  id,
  title,
  postSlug,
  communitySlug,
  image,
  description,
  exclusive = false,
  status,
  liked = false,
  likes = 0,
  comments = 0,
  isOwner = false,
}: PostCardProps): JSX.Element {
  const optionsMenuList = useMemo(() => {
    const array: MenuItemProps[] = [
      {
        text: 'Visualizar',
        href: `/${communitySlug}/post/${postSlug}`,
        selected: false,
        textSize: 'small',
      },
      {
        text: 'Editar',
        href: `/${communitySlug}/draft?id=${id}`,
        selected: false,
        textSize: 'small',
      },
    ];

    return array;
  }, [id, communitySlug, postSlug]);

  const postStatus = useMemo(() => {
    switch (status) {
      case PostStatus.Published:
        return <PostStatusBadge status={PostStatus.Published} />;

      case PostStatus.Scheduled:
        return <PostStatusBadge status={PostStatus.Scheduled} />;

      default:
        return <PostStatusBadge status={PostStatus.Draft} />;
    }
  }, [status]);

  const postCardContainer = useMemo(
    () => (
      <PostCardContainer isOwner={isOwner}>
        <PostCardImageContainer>
          {image && <NextImage src={image} height={530} width={940} />}
          {!image && <PostCardImagePlaceholder />}
        </PostCardImageContainer>

        <PostCardContent exclusive={exclusive}>
          {exclusive && <h5>Exclusivo</h5>}

          <PostCardUpperContent>
            <PostCardContentHeader>
              <h4>{title}</h4>
              {description && <p>{description}</p>}
            </PostCardContentHeader>

            {isOwner && (
              <div>
                <OptionsMenu menuItems={optionsMenuList} />
              </div>
            )}
          </PostCardUpperContent>

          <LikeCommentStatusContainer>
            <LikeCommentCount liked={liked} likes={likes} comments={comments} />

            {isOwner && postStatus}
          </LikeCommentStatusContainer>
        </PostCardContent>
      </PostCardContainer>
    ),
    [
      comments,
      description,
      exclusive,
      image,
      isOwner,
      liked,
      likes,
      optionsMenuList,
      title,
      postStatus,
    ],
  );

  return (
    <>
      {!isOwner && (
        <NextLink href={`/${communitySlug}/post/${postSlug}`} passHref>
          {postCardContainer}
        </NextLink>
      )}
      {isOwner && postCardContainer}
    </>
  );
}
