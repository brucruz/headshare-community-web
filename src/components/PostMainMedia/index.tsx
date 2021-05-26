import NextImage from 'next/image';
import { MdPause } from 'react-icons/md';
import { useCallback, useEffect, useState } from 'react';
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
  useGetPostMainMediaQuery,
  useUpdatePostMainImageMutation,
  useUploadVideoMutation,
} from '../../generated/graphql';
import { UploadModal } from '../UploadModal';
import {
  UploadCallbackResponse,
  UploadInfoProps,
} from '../../hooks/useUploadFile';
import { ImageDimensions } from '../MediaInput';
import { useFormattedUpload } from '../../hooks/useFormattedUpload';

export interface PostMainMediaProps {
  postId: string;
  communitySlug: string;
}

export function PostMainMedia({
  postId,
  communitySlug,
}: PostMainMediaProps): JSX.Element {
  const [mainMediaState, setMainMediaState] = useState<
    'empty' | 'uploading' | 'ready'
  >('ready');
  const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
    bytesSent: 0,
    bytesTotal: 0,
    progress: 0,
  });
  const [displayUploadModal, setDisplayUploadModal] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState<
    ImageDimensions | undefined
  >(undefined);

  const { data } = useGetPostMainMediaQuery({
    variables: {
      id: postId,
    },
  });

  const [uploadVideo] = useUploadVideoMutation();
  const [uploadImage] = useUpdatePostMainImageMutation();

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
          // postId: thisPostId,
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

      if (videoData?.uploadVideo.errors) {
        return {
          callbackStatus: 'error',
          message: videoData.uploadVideo.errors[0].message,
        };
      }

      if (videoData?.uploadVideo.media?.uploadLink) {
        setMainMediaState('ready');

        setDisplayUploadModal(false);

        // router.reload();

        return {
          callbackStatus: 'success',
          uploadLink: videoData?.uploadVideo.media?.uploadLink,
        };
      }

      return {
        callbackStatus: 'error',
        message: 'An error ocurred, try again later',
      };
    },
    [communitySlug, uploadVideo],
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

  useEffect(() => {
    if (data?.findPostById?.post?.mainMedia) {
      setMainMediaState('ready');
    } else {
      setMainMediaState('empty');
    }
  }, [data?.findPostById?.post?.mainMedia]);

  return (
    <PostMainMediaContainer>
      {mainMediaState === 'empty' && (
        <ImageVideoUpload
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
                <UploadStatusBar progress={0.5} />
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

      {mainMediaState === 'ready' && data?.findPostById?.post?.mainMedia && (
        <Media
          mediaUrl={data?.findPostById?.post?.mainMedia.url}
          format={data?.findPostById?.post?.mainMedia.format}
          width={data?.findPostById?.post?.mainMedia?.width}
          height={data?.findPostById?.post?.mainMedia?.height}
          editClick={() => ''}
          removeClick={() => ''}
          // editClick={() => setDisplayMainMediaModal(!displayMainMediaModal)}
          // removeClick={() => removePostMainMedia()}
        />
      )}

      <UploadModal
        communitySlug={communitySlug}
        displayUploadModal={displayUploadModal}
        setDisplayUploadModal={() => setDisplayUploadModal(false)}
        passUploadInfo={args => setUploadInfo(args)}
        getImageDimensions={setImageDimensions}
        imageUploadCallback={imageUploadCallback}
        videoUploadCallback={videoUploadCallback}
      />
    </PostMainMediaContainer>
  );
}
