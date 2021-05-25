import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import * as tus from 'tus-js-client';

import { IMAGE, VIDEO } from '../../constants/mediaFormat';
import {
  useUploadVideoMutation,
  MediaFormat,
  Media,
  useUpdatePostMainImageMutation,
} from '../../generated/graphql';
// import { formatS3Filename, uploadToS3 } from '../../lib/s3';
import {
  MediaFormatSelection,
  UploadModalContainer,
  UploadHeaderContainer,
  VideoUploadOptions,
  StateHeader,
} from '../../styles/components/UploadModal';
import Button from '../Button';
import MediaInput, { ImageDimensions } from '../MediaInput';
import Modal from '../Modal';
import { RadioInput } from '../RadioInput/index';
import ArrowLeft from '../../assets/components/ButtonBack/leftArrow.svg';
import {
  UploadCallbackResponse,
  useUploadFile,
} from '../../hooks/useUploadFile';

type SelectedMediaProps = 'image' | 'video' | 'none';

export interface UploadInfoProps {
  bytesSent: number;
  bytesTotal: number;
  progress: number;
  status?: 'started' | 'paused' | 'finished' | 'errored';
  error?: string;
  mainMedia?: Pick<
    Media,
    | '_id'
    | 'url'
    | 'thumbnailUrl'
    | 'uploadLink'
    | 'file'
    | 'format'
    | 'width'
    | 'height'
  > | null;
}

export interface UploadModalProps {
  communitySlug: string;
  postId: string;
  mediaInitialSelection?: SelectedMediaProps;
  displayUploadModal: boolean;
  setDisplayUploadModal: (args: boolean) => void;
  setMainMediaState: (args: 'empty' | 'uploading' | 'ready') => void;
  passUploadInfo: (args: UploadInfoProps) => void;
}

function UploadModal({
  communitySlug,
  postId,
  mediaInitialSelection = 'none',
  displayUploadModal,
  setDisplayUploadModal,
  setMainMediaState,
  passUploadInfo,
}: UploadModalProps): JSX.Element {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMediaProps>(
    mediaInitialSelection,
  );
  const [
    clickedMediaSelector,
    setClickedMediaSelector,
  ] = useState<SelectedMediaProps>('none');
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  // const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
  //   bytesSent: 0,
  //   bytesTotal: 0,
  //   progress: 0,
  // });
  const [imageDimensions, setImageDimensions] = useState<
    ImageDimensions | undefined
  >(undefined);

  const [uploadInfo, uploadMedia] = useUploadFile();

  const [uploadVideo] = useUploadVideoMutation();
  const [uploadImage] = useUpdatePostMainImageMutation();

  const router = useRouter();

  useEffect(() => {
    passUploadInfo(uploadInfo);
  }, [uploadInfo, passUploadInfo]);

  // const upload = useRef<tus.Upload>();

  const state = useMemo(() => {
    let title: string;
    let buttonTitle: string;

    switch (selectedMedia) {
      case 'image':
        title = 'Selecione um arquivo de imagem';
        buttonTitle = 'Carregar';
        break;

      case 'video':
        title = 'Selecione um arquivo de vídeo';
        buttonTitle = 'Carregar';
        break;

      default:
        title = 'Selecione o tipo de mídia que você deseja adicionar';
        buttonTitle = 'Prosseguir';
    }

    return { title, buttonTitle };
  }, [selectedMedia]);

  const handleSelectMediaFormat = useCallback(() => {
    setSelectedMedia(clickedMediaSelector);
  }, [clickedMediaSelector]);

  const handleGetFile = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  const handleUploadVideo = useCallback(
    async (thisPostId: string, commSlug: string, videoFile: File) => {
      async function uploadCallback(
        fileName?: string,
        fileExtension?: string,
      ): Promise<UploadCallbackResponse> {
        const { data, errors } = await uploadVideo({
          variables: {
            communitySlug: commSlug,
            // postId: thisPostId,
            videoData: {
              format: MediaFormat.Video,
              file: {
                name: fileName,
                type: videoFile.type,
                extension: fileExtension,
                size: videoFile.size,
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

        if (data?.uploadVideo.errors) {
          return {
            callbackStatus: 'error',
            message: data.uploadVideo.errors[0].message,
          };
        }

        if (data?.uploadVideo.media?.uploadLink) {
          setMainMediaState('ready');

          setDisplayUploadModal(false);

          router.reload();

          return {
            callbackStatus: 'success',
            uploadLink: data?.uploadVideo.media?.uploadLink,
          };
        }

        return {
          callbackStatus: 'error',
          message: 'An error ocurred, try again later',
        };
      }

      uploadMedia({
        communitySlug: commSlug,
        format: MediaFormat.Video,
        file: videoFile,
        uploadCallback,
      });

      setDisplayUploadModal(false);

      // if (selectedFile) {
      //   const { size, name, type } = selectedFile;

      //   const response = await uploadVideo({
      //     variables: {
      //       communitySlug,
      //       videoData: {
      //         file: {
      //           name,
      //           size,
      //         },
      //         format: MediaFormat.Video,
      //       },
      //     },
      //   });

      //   upload.current = new tus.Upload(selectedFile, {
      //     uploadUrl: response.data?.uploadVideo.media?.uploadLink,
      //     onError(error) {
      //       console.log(`Failed because: ${error.message}`);

      //       setUploadInfo(previousUploadInfo => ({
      //         bytesSent: previousUploadInfo.bytesSent,
      //         bytesTotal: size,
      //         progress: previousUploadInfo.progress,
      //         status: 'errored',
      //         mainMedia: previousUploadInfo.mainMedia,
      //       }));
      //     },
      //     onProgress(bytesSent: number, bytesTotal: number) {
      //       const progress = bytesSent / bytesTotal;

      //       setUploadInfo(previousUploadInfo => ({
      //         bytesSent,
      //         bytesTotal,
      //         progress,
      //         status: 'started',
      //         mainMedia: previousUploadInfo.mainMedia,
      //       }));
      //     },
      //     onSuccess() {
      //       setUploadInfo(previousUploadInfo => ({
      //         bytesSent: previousUploadInfo.bytesSent,
      //         bytesTotal: size,
      //         progress: previousUploadInfo.progress,
      //         status: 'finished',
      //         mainMedia: previousUploadInfo.mainMedia,
      //       }));

      //       setMainMediaState('ready');
      //     },
      //   });

      //   upload.current.start();
      //   setMainMediaState('uploading');

      //   setDisplayUploadModal(false);

      //   setUploadInfo({
      //     bytesSent: 0,
      //     bytesTotal: size,
      //     progress: 0,
      //     status: 'started',
      //     mainMedia: response.data?.uploadVideo.media,
      //   });
      // }
    },
    [
      uploadMedia,
      uploadVideo,
      setMainMediaState,
      setDisplayUploadModal,
      router,
    ],
  );

  const handleUploadImageAsMain = useCallback(
    async (thisPostId: string, commSlug: string, imageFile: File) => {
      async function uploadCallback(
        fileName?: string,
        fileExtension?: string,
      ): Promise<UploadCallbackResponse> {
        const { data, errors } = await uploadImage({
          variables: {
            communitySlug: commSlug,
            postId: thisPostId,
            imageData: {
              format: MediaFormat.Image,
              width: imageDimensions?.width,
              height: imageDimensions?.height,
              file: {
                name: fileName,
                type: imageFile.type,
                extension: fileExtension,
                size: imageFile.size,
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

        if (data?.updatePostMainImage.errors) {
          return {
            callbackStatus: 'error',
            message: data.updatePostMainImage.errors[0].message,
          };
        }

        if (data?.updatePostMainImage.post?.mainMedia?.uploadLink) {
          setMainMediaState('ready');

          setDisplayUploadModal(false);

          router.reload();

          return {
            callbackStatus: 'success',
            uploadLink: data.updatePostMainImage.post.mainMedia.uploadLink,
          };
        }

        return {
          callbackStatus: 'error',
          message: 'An error ocurred, try again later',
        };
      }

      uploadMedia({
        communitySlug: commSlug,
        format: MediaFormat.Image,
        file: imageFile,
        uploadCallback,
      });

      setDisplayUploadModal(false);

      // if (imageFile) {
      //   const [filename, fileExtension] = formatS3Filename(
      //     imageFile.name,
      //     commSlug,
      //   );

      //   const { data: uploadData } = await uploadImage({
      //     variables: {
      //       communitySlug: commSlug,
      //       postId: thisPostId,
      //       imageData: {
      //         format: MediaFormat.Image,
      //         width: imageDimensions?.width,
      //         height: imageDimensions?.height,
      //         file: {
      //           name: filename,
      //           type: imageFile.type,
      //           extension: fileExtension,
      //           size: imageFile.size,
      //         },
      //       },
      //     },
      //   });

      //   if (
      //     uploadData &&
      //     uploadData.updatePostMainImage &&
      //     uploadData.updatePostMainImage.post &&
      //     uploadData.updatePostMainImage.post.mainMedia
      //   ) {
      //     const { mainMedia } = uploadData.updatePostMainImage.post;
      //     const { uploadLink } = mainMedia;

      //     try {
      //       await uploadToS3(imageFile, uploadLink);

      //       setUploadInfo({
      //         status: 'finished',
      //         bytesSent: imageFile.size,
      //         bytesTotal: imageFile.size,
      //         progress: 1,
      //         mainMedia,
      //       });
      //     } catch (err) {
      //       setUploadInfo({
      //         status: 'errored',
      //         bytesSent: 0,
      //         bytesTotal: imageFile.size,
      //         progress: 0,
      //         error: err,
      //         mainMedia,
      //       });
      //     }
      //   }

      //   setMainMediaState('ready');

      //   setDisplayUploadModal(false);

      //   router.reload();
      // }
    },
    [
      uploadMedia,
      uploadImage,
      imageDimensions,
      setMainMediaState,
      setDisplayUploadModal,
      router,
    ],
  );

  const closeUploadModal = useCallback(() => {
    setDisplayUploadModal(false);

    setClickedMediaSelector('none');

    setSelectedMedia('none');
  }, [setDisplayUploadModal]);

  return (
    <Modal isOpen={displayUploadModal} setIsOpen={closeUploadModal} closeButton>
      <UploadModalContainer>
        <UploadHeaderContainer>
          <StateHeader>
            {selectedMedia !== 'none' && (
              <div className="button-wrapper">
                <ArrowLeft onClick={() => setSelectedMedia('none')} />
                {/* <NextImage
                  src="https://headshare.s3.amazonaws.com/assets/arrow_left.png"
                  width={30}
                  height={30}
                  onClick={() => setSelectedMedia('none')}
                /> */}
              </div>
            )}
            <h2>{state.title}</h2>
          </StateHeader>
        </UploadHeaderContainer>

        {selectedMedia === 'none' && (
          <>
            <MediaFormatSelection>
              <RadioInput
                name="media-format"
                label="Vídeo"
                isChecked={clickedMediaSelector === VIDEO}
                onChange={() => setClickedMediaSelector(VIDEO)}
              />
              <RadioInput
                name="media-format"
                label="Imagem"
                isChecked={clickedMediaSelector === IMAGE}
                onChange={() => setClickedMediaSelector(IMAGE)}
              />
            </MediaFormatSelection>

            <Button
              text={state.buttonTitle}
              stretch
              onClick={handleSelectMediaFormat}
            />
          </>
        )}

        {selectedMedia === VIDEO && (
          <>
            <VideoUploadOptions>
              <MediaInput
                name="main-video"
                label="Selecione um arquivo"
                getFile={handleGetFile}
                fileType="video"
              />
            </VideoUploadOptions>

            <Button
              text={state.buttonTitle}
              disabled={!selectedFile}
              stretch
              onClick={() =>
                selectedFile &&
                handleUploadVideo(postId, communitySlug, selectedFile)
              }
            />
          </>
        )}

        {selectedMedia === IMAGE && (
          <>
            <VideoUploadOptions>
              <MediaInput
                name="main-video"
                label="Selecione um arquivo"
                getFile={handleGetFile}
                fileType="image"
                getImageDimensions={setImageDimensions}
              />
            </VideoUploadOptions>

            <Button
              text={state.buttonTitle}
              disabled={!selectedFile}
              stretch
              onClick={() =>
                selectedFile &&
                handleUploadImageAsMain(postId, communitySlug, selectedFile)
              }
            />
          </>
        )}
      </UploadModalContainer>
    </Modal>
  );
}

export default UploadModal;
