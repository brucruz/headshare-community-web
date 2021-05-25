import NextLink from 'next/link';
import NextImage from 'next/image';
import { useMemo, useState } from 'react';
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
// import LikeCommentCount from './LikeCommentCount';
import { OptionsMenu } from './OptionsMenu';
import { MenuItemProps } from './MenuItem';
import { PostStatus, useDeletePostMutation } from '../generated/graphql';
import { ConfirmationModal } from './ConfirmationModal';
import { useSnackbar } from '../hooks/useSnackbar';

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
  removePost?: (id: string) => void;
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
  removePost,
}: PostCardProps): JSX.Element {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [confirmationError, setConfirmationError] = useState<
    string | undefined
  >(undefined);

  const { addSnackbar } = useSnackbar();

  const [deletePost] = useDeletePostMutation();

  function openConfirmationModal(): void {
    setIsOpenConfirmationModal(true);
  }

  function closeConfirmationModal(): void {
    setIsOpenConfirmationModal(false);
  }

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
      {
        text: 'Deletar',
        selected: false,
        textSize: 'small',
        onClick: () => openConfirmationModal(),
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

  const postCardContainer = useMemo(() => {
    async function handlePostExclusion(): Promise<void> {
      const { data } = await deletePost({
        variables: {
          communitySlug,
          postId: id,
        },
      });

      if (data?.deletePost.success === false) {
        setConfirmationError('Houve um erro na sua requisição');

        addSnackbar({
          message: 'Erro ao tentar excluir seu post',
        });
      }

      if (data?.deletePost.success === true) {
        setIsOpenConfirmationModal(false);
        removePost && removePost(id);

        addSnackbar({
          message: 'Post excluído com sucesso',
        });
      }
    }

    return (
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
            {/* <LikeCommentCount liked={liked} likes={likes} comments={comments} /> */}

            {isOwner && postStatus}
          </LikeCommentStatusContainer>
        </PostCardContent>

        <ConfirmationModal
          confirmationText={{
            title: 'Tem certeza que quer excluir este post?',
            subtitle: `Você está prestes a excluir o post "${title}". Clique em cancelar, caso tenha sido um engano.`,
          }}
          isOpen={isOpenConfirmationModal}
          setIsOpen={closeConfirmationModal}
          confirmationAction={handlePostExclusion}
          error={confirmationError}
        />
      </PostCardContainer>
    );
  }, [
    isOwner,
    image,
    exclusive,
    title,
    description,
    optionsMenuList,
    postStatus,
    isOpenConfirmationModal,
    confirmationError,
    deletePost,
    communitySlug,
    id,
    addSnackbar,
    removePost,
  ]);

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
