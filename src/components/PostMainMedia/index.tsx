import NextImage from 'next/image';
import { MdPause } from 'react-icons/md';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  PostMainMediaContainer,
  ImageVideoIcon,
  ImageVideoUpload,
  UploadStatusBarContainer,
  UploadStatusBar,
  UploadStatusHeader,
  ImageVideoUploading,
  UploadPauseResumeButton,
  UploadStatus,
} from '../../styles/components/PostMainMedia';
import { Media } from '../Media';
import {
  MediaFormat,
  useDeletePostMainMediaMutation,
  useGetPostMainMediaLazyQuery,
  useUpdatePostMainImageMutation,
  useUpdatePostMainVideoMutation,
} from '../../generated/graphql';
import { UploadModal } from '../UploadModal';
import {
  UploadCallbackResponse,
  UploadInfoProps,
} from '../../hooks/useUploadFile';
import { ImageDimensions } from '../MediaInput';
import { useFormattedUpload } from '../../hooks/useFormattedUpload';
import { useSnackbar } from '../../hooks/useSnackbar';

export interface PostMainMediaProps {
  postId: string;
  communitySlug: string;
}

export function PostMainMedia({
  postId,
  communitySlug,
}: PostMainMediaProps): JSX.Element {
  const [mainMediaState, setMainMediaState] =
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

  const [getPostMainMedia, { data }] = useGetPostMainMediaLazyQuery();
  const [mainMedia, setMainMedia] = useState(
    data?.findPostById?.post?.mainMedia,
  );

  const [uploadVideo] = useUpdatePostMainVideoMutation();
  const [uploadImage] = useUpdatePostMainImageMutation();
  const [removeMainMedia] = useDeletePostMainMediaMutation();

  const { addSnackbar } = useSnackbar();

  const formattedUpload = useFormattedUpload(uploadInfo);

  const videoUploadCallback = useCallback(
    async (
      fileName?: string,
      fileExtension?: string,
      videoFile?: File,
    ): Promise<UploadCallbackResponse> => {
      const { data: videoData, errors } = await uploadVideo({
        variables: {
          communitySlug,
          postId,
          videoData: {
            format: MediaFormat.Video,
            file: {
              name: fileName,
              type: videoFile && videoFile.type,
              extension: fileExtension,
              size: videoFile && videoFile.size,
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

      if (videoData?.updatePostMainVideo.mainMedia?.uploadLink) {
        setMainMediaState('ready');

        setDisplayUploadModal(false);

        // router.reload();

        return {
          callbackStatus: 'success',
          uploadLink: videoData?.updatePostMainVideo.mainMedia?.uploadLink,
        };
      }

      return {
        callbackStatus: 'error',
        message: 'An error ocurred, try again later',
      };
    },
    [communitySlug, postId, uploadVideo],
  );

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

      if (imageData?.updatePostMainImage.errors) {
        return {
          callbackStatus: 'error',
          message: imageData.updatePostMainImage.errors[0].message,
        };
      }

      if (imageData?.updatePostMainImage.post?.mainMedia?.uploadLink) {
        setMainMediaState('ready');

        setDisplayUploadModal(false);

        // router.reload();

        return {
          callbackStatus: 'success',
          uploadLink: imageData.updatePostMainImage.post.mainMedia.uploadLink,
        };
      }

      return {
        callbackStatus: 'error',
        message: 'An error ocurred, try again later',
      };
    },
    [communitySlug, imageDimensions, postId, uploadImage],
  );

  const removePostMainMedia = useCallback(async () => {
    const { data: removeResponse } = await removeMainMedia({
      variables: {
        communitySlug,
        postId,
      },
    });

    const errors = removeResponse?.deletePostMainMedia.errors;
    const returnedMainMedia =
      removeResponse?.deletePostMainMedia.post?.mainMedia;

    if (!returnedMainMedia) {
      addSnackbar({
        message: 'Mídia removida com sucesso',
      });
    }

    if (returnedMainMedia || errors) {
      // add retry action to this snackbar
      addSnackbar({
        message: 'Houve um problema ao remover a mídia principal do seu post',
      });
    }

    if (!returnedMainMedia && !errors) {
      setMainMediaState('empty');
      setMainMedia(undefined);
    }
  }, [addSnackbar, communitySlug, postId, removeMainMedia]);

  useEffect(() => {
    if (postId) {
      getPostMainMedia({
        variables: {
          id: postId,
        },
      });
    }
  }, [getPostMainMedia, postId]);

  useEffect(() => {
    if (data?.findPostById?.post?.mainMedia) {
      setMainMediaState('ready');
      setMainMedia(data?.findPostById?.post?.mainMedia);
    } else {
      setMainMediaState('empty');
    }
  }, [data?.findPostById?.post?.mainMedia]);

  const mediaUrl = useMemo(() => {
    switch ((uploadInfo.status, mainMedia?.url)) {
      case mainMedia?.url:
        return mainMedia?.url;

      case !mainMedia?.url && uploadInfo.status === 'finished' && preview:
        return preview;

      default:
        return undefined;
    }
  }, [mainMedia?.url, preview, uploadInfo.status]);

  return (
    <PostMainMediaContainer data-testid="post-main-media">
      {mainMediaState === 'empty' && (
        <ImageVideoUpload
          data-testid="post-main-media-empty"
          type="button"
          onClick={() => setDisplayUploadModal(true)}
        >
          <ImageVideoIcon>
            <NextImage
              src="https://headshare.s3.amazonaws.com/assets/image_icon.png"
              height={100}
              width={100}
            />
          </ImageVideoIcon>
        </ImageVideoUpload>
      )}

      {mainMediaState === 'uploading' && (
        <ImageVideoUploading>
          <UploadStatus>
            <UploadStatusHeader>
              <UploadStatusBarContainer>
                <UploadStatusBar progress={uploadInfo.progress} />
              </UploadStatusBarContainer>
              <UploadPauseResumeButton>
                <MdPause />
              </UploadPauseResumeButton>
            </UploadStatusHeader>

            <h5>
              Uploaded {formattedUpload.bytesSent} of{' '}
              {formattedUpload.bytesTotal} ({formattedUpload.progress})
            </h5>
          </UploadStatus>
        </ImageVideoUploading>
      )}

      {mainMediaState === 'ready' && mainMedia && mediaUrl && (
        <Media
          mediaUrl={mediaUrl}
          format={mainMedia.format}
          width={mainMedia?.width}
          height={mainMedia?.height}
          editClick={() => setDisplayUploadModal(true)}
          removeClick={() => removePostMainMedia()}
        />
      )}

      <UploadModal
        communitySlug={communitySlug}
        displayUploadModal={displayUploadModal}
        setDisplayUploadModal={() => setDisplayUploadModal(false)}
        passUploadInfo={args => setUploadInfo(args)}
        getImageDimensions={setImageDimensions}
        getPreview={prv => prv && setPreview(prv)}
        imageUploadCallback={imageUploadCallback}
        videoUploadCallback={videoUploadCallback}
      />
    </PostMainMediaContainer>
  );
}
