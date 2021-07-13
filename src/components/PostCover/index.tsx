/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PostCoverContainer, ImageUploadIcon, ImagePreview } from './PostCover';
import {
  MediaFormat,
  useUpdatePostCoverMutation,
  useGetPostCoverLazyQuery,
  useDeletePostCoverMutation,
} from '../../generated/graphql';
import { UploadModal } from '../UploadModal';
import { UploadCallbackResponse } from '../../hooks/useUploadFile';
import { ImageDimensions } from '../MediaInput';
import { Media } from '../Media';
import { useSnackbar } from '../../hooks/useSnackbar';
import ImageVideoIcon from '../../assets/components/imageVideoIcon.svg';

export interface PostCoverProps {
  postId: string;
  communitySlug: string;
}

export function PostCover({
  postId,
  communitySlug,
}: PostCoverProps): JSX.Element {
  const [coverState, setCoverState] =
    useState<'empty' | 'uploading' | 'ready'>('ready');
  const [displayUploadModal, setDisplayUploadModal] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const [getPostCover, { data }] = useGetPostCoverLazyQuery();
  const [uploadImage] = useUpdatePostCoverMutation();
  const [removeCover] = useDeletePostCoverMutation();

  const { addSnackbar } = useSnackbar();

  const [cover, setCover] = useState(data?.findPostById?.post?.cover);

  const imageUploadCallback = useCallback(
    async (
      fileName?: string,
      fileExtension?: string,
      imageFile?: File,
    ): Promise<UploadCallbackResponse> => {
      const { data: imageData, errors } = await uploadImage({
        variables: {
          communitySlug,
          postId,
          imageData: {
            format: MediaFormat.Image,
            width: imageDimensions?.width,
            height: imageDimensions?.height,
            file: {
              name: fileName,
              type: imageFile && imageFile.type,
              extension: fileExtension,
              size: imageFile && imageFile.size,
            },
          },
        },
      });

      if (errors) {
        return {
          callbackStatus: 'error',
          message: errors[0].message,
        };
      }
      if (imageData?.updatePostCover.cover?.uploadLink) {
        setCoverState('ready');
        setDisplayUploadModal(false);
        // router.reload();
        return {
          callbackStatus: 'success',
          uploadLink: imageData.updatePostCover.cover.uploadLink,
        };
      }
      return {
        callbackStatus: 'error',
        message: 'An error ocurred, try again later',
      };
    },
    [communitySlug, imageDimensions, postId, uploadImage],
  );

  const removePostCover = useCallback(async () => {
    const { data: removeResponse, errors } = await removeCover({
      variables: {
        communitySlug,
        postId,
      },
    });
    const returnedCover = removeResponse?.deletePostCover.cover;
    if (!returnedCover && !errors) {
      setCoverState('empty');
      setCover(undefined);

      addSnackbar({
        message: 'Mídia removida com sucesso',
      });
    }
    if (errors) {
      // add retry action to this snackbar
      addSnackbar({
        message: 'Houve um problema ao remover a mídia principal do seu post',
      });
    }
  }, [addSnackbar, communitySlug, postId, removeCover]);

  useEffect(() => {
    if (postId) {
      getPostCover({
        variables: {
          id: postId,
        },
      });
    }
  }, [getPostCover, postId]);

  useEffect(() => {
    if (data?.findPostById?.post?.cover) {
      setCoverState('ready');
      setCover(data?.findPostById?.post?.cover);
    } else {
      setCoverState('empty');
    }
  }, [data?.findPostById?.post?.cover]);

  const mediaUrl = useMemo(() => {
    if (preview) {
      return preview;
    }

    if (!preview && cover?.url) {
      return cover?.url;
    }

    return undefined;
  }, [cover?.url, preview]);

  return (
    <PostCoverContainer data-testid="post-cover">
      {coverState === 'empty' && (
        <ImageUploadIcon
          data-testid="post-cover-empty"
          type="button"
          onClick={() => setDisplayUploadModal(true)}
        >
          <ImageVideoIcon />
        </ImageUploadIcon>
      )}

      {coverState === 'ready' && mediaUrl && (
        <ImagePreview>
          <Media
            mediaUrl={mediaUrl}
            format={cover?.format || MediaFormat.Image}
            width={cover?.width}
            height={cover?.height}
            editClick={() => setDisplayUploadModal(true)}
            removeClick={() => removePostCover()}
          />
        </ImagePreview>
      )}
      <UploadModal
        communitySlug={communitySlug}
        displayUploadModal={displayUploadModal}
        setDisplayUploadModal={() => setDisplayUploadModal(false)}
        passUploadInfo={() => ''}
        getImageDimensions={setImageDimensions}
        getPreview={prv => prv && setPreview(prv)}
        acceptedMediaFormats={['image']}
        imageUploadCallback={imageUploadCallback}
      />
    </PostCoverContainer>
  );
}
