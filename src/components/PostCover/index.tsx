/* eslint-disable prettier/prettier */
import NextImage from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PostCoverContainer, ImageUploadIcon, ImagePreview } from './PostCover';
import {
  MediaFormat,
  useUpdatePostCoverMutation,
  useGetPostCoverLazyQuery,
  useDeletePostCoverMutation,
} from '../../generated/graphql';
import { UploadModal } from '../UploadModal';
import {
  UploadCallbackResponse,
  UploadInfoProps,
} from '../../hooks/useUploadFile';
import { ImageDimensions } from '../MediaInput';
import { Media } from '../Media';
import { useSnackbar } from '../../hooks/useSnackbar';

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
  const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
    bytesSent: 0,
    bytesTotal: 0,
    progress: 0,
  });
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
    switch ((uploadInfo.status, cover?.url)) {
      case cover?.url:
        return cover?.url;

      case !cover?.url && uploadInfo.status === 'finished' && preview:
        return preview;

      default:
        return undefined;
    }
  }, [cover?.url, preview, uploadInfo.status]);

  return (
    <PostCoverContainer data-testid="post-cover">
      {coverState === 'empty' && (
        <ImageUploadIcon
          data-testid="post-cover-empty"
          type="button"
          onClick={() => setDisplayUploadModal(true)}
        >
          <NextImage
            src="https://headshare.s3.amazonaws.com/assets/image_icon.png"
            height={100}
            width={100}
          />
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
            // removeClick={() => ''}
            removeClick={() => removePostCover()}
          />
        </ImagePreview>
      )}
      <UploadModal
        communitySlug={communitySlug}
        displayUploadModal={displayUploadModal}
        setDisplayUploadModal={() => setDisplayUploadModal(false)}
        passUploadInfo={args => setUploadInfo(args)}
        getImageDimensions={setImageDimensions}
        getPreview={prv => prv && setPreview(prv)}
        acceptedMediaFormats={['image']}
        imageUploadCallback={imageUploadCallback}
      />
    </PostCoverContainer>
  );
}
