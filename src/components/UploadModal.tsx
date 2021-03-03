import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import * as tus from 'tus-js-client';

import { IMAGE, VIDEO } from '../constants/mediaFormat';
import {
  useUploadVideoMutation,
  MediaFormat,
  Media,
  useUpdatePostMainImageMutation,
} from '../generated/graphql';
import { formatS3Filename, uploadToS3 } from '../lib/s3';
import {
  MediaFormatSelection,
  UploadModalContainer,
  UploadHeaderContainer,
  VideoUploadOptions,
  StateHeader,
} from '../styles/components/UploadModal';
import Button from './Button';
import ButtonBack from './ButtonBack';
import MediaInput, { ImageDimensions } from './MediaInput';
import Modal from './Modal';
import RadioButton from './RadioButton';

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

interface UploadModalProps {
  communitySlug: string;
  postId: string;
  mediaInitialSelection?: SelectedMediaProps;
  displayUploadModal: boolean;
  setDisplayUploadModal: (args: boolean) => void;
  setMainMediaState: (args: 'empty' | 'uploading' | 'ready') => void;
  passUploadInfo: (args: UploadInfoProps) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  communitySlug,
  postId,
  mediaInitialSelection = 'none',
  displayUploadModal,
  setDisplayUploadModal,
  setMainMediaState,
  passUploadInfo,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMediaProps>(
    mediaInitialSelection,
  );
  const [
    clickedMediaSelector,
    setClickedMediaSelector,
  ] = useState<SelectedMediaProps>('none');
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
    bytesSent: 0,
    bytesTotal: 0,
    progress: 0,
  });
  const [imageDimensions, setImageDimensions] = useState<
    ImageDimensions | undefined
  >(undefined);

  const [uploadVideo] = useUploadVideoMutation();
  const [uploadImage] = useUpdatePostMainImageMutation();

  const router = useRouter();

  useEffect(() => {
    passUploadInfo(uploadInfo);
  }, [uploadInfo, passUploadInfo]);

  const upload = useRef<tus.Upload>();

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

  const handleUploadVideo = useCallback(async () => {
    if (selectedFile) {
      const { size, name, type } = selectedFile;

      const response = await uploadVideo({
        variables: {
          communitySlug,
          videoData: {
            file: {
              name,
              size,
            },
            format: MediaFormat.Video,
          },
        },
      });

      upload.current = new tus.Upload(selectedFile, {
        uploadUrl: response.data?.uploadVideo.media?.uploadLink,
        onError(error) {
          console.log(`Failed because: ${error}`);

          setUploadInfo(previousUploadInfo => ({
            bytesSent: previousUploadInfo.bytesSent,
            bytesTotal: size,
            progress: previousUploadInfo.progress,
            status: 'errored',
            mainMedia: previousUploadInfo.mainMedia,
          }));
        },
        onProgress(bytesSent: number, bytesTotal: number) {
          const progress = bytesSent / bytesTotal;

          setUploadInfo(previousUploadInfo => ({
            bytesSent,
            bytesTotal,
            progress,
            status: 'started',
            mainMedia: previousUploadInfo.mainMedia,
          }));
        },
        onSuccess() {
          setUploadInfo(previousUploadInfo => ({
            bytesSent: previousUploadInfo.bytesSent,
            bytesTotal: size,
            progress: previousUploadInfo.progress,
            status: 'finished',
            mainMedia: previousUploadInfo.mainMedia,
          }));

          setMainMediaState('ready');
        },
      });

      upload.current.start();
      setMainMediaState('uploading');

      setDisplayUploadModal(false);

      setUploadInfo({
        bytesSent: 0,
        bytesTotal: size,
        progress: 0,
        status: 'started',
        mainMedia: response.data?.uploadVideo.media,
      });
    }
  }, [
    selectedFile,
    uploadVideo,
    communitySlug,
    setDisplayUploadModal,
    setMainMediaState,
  ]);

  const handleUploadImageAsMain = useCallback(
    async (thisPostId: string, commSlug: string) => {
      if (selectedFile) {
        const [filename, fileExtension] = formatS3Filename(
          selectedFile.name,
          commSlug,
        );

        const { data: uploadData } = await uploadImage({
          variables: {
            communitySlug: commSlug,
            postId: thisPostId,
            imageData: {
              format: MediaFormat.Image,
              width: imageDimensions?.width,
              height: imageDimensions?.height,
              file: {
                name: filename,
                type: selectedFile.type,
                extension: fileExtension,
                size: selectedFile.size,
              },
            },
          },
        });

        if (
          uploadData &&
          uploadData.updatePostMainImage &&
          uploadData.updatePostMainImage.post &&
          uploadData.updatePostMainImage.post.mainMedia
        ) {
          const { mainMedia } = uploadData.updatePostMainImage.post;
          const { uploadLink } = mainMedia;

          try {
            await uploadToS3(selectedFile, uploadLink);

            setUploadInfo({
              status: 'finished',
              bytesSent: selectedFile.size,
              bytesTotal: selectedFile.size,
              progress: 1,
              mainMedia,
            });
          } catch (err) {
            setUploadInfo({
              status: 'errored',
              bytesSent: 0,
              bytesTotal: selectedFile.size,
              progress: 0,
              error: err,
              mainMedia,
            });
          }
        }

        setMainMediaState('ready');

        setDisplayUploadModal(false);

        router.reload();
      }
    },
    [
      selectedFile,
      uploadImage,
      imageDimensions?.width,
      imageDimensions?.height,
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
    <Modal isOpen={displayUploadModal} setIsOpen={closeUploadModal}>
      <UploadModalContainer>
        <UploadHeaderContainer>
          <button type="button" onClick={closeUploadModal}>
            <MdClose />
          </button>

          <StateHeader>
            {selectedMedia !== 'none' && (
              <div className="button-wrapper">
                <NextImage
                  src="https://headshare.s3.amazonaws.com/assets/arrow_left.png"
                  width={30}
                  height={30}
                  onClick={() => setSelectedMedia('none')}
                />
              </div>
            )}
            <h2>{state.title}</h2>
          </StateHeader>
        </UploadHeaderContainer>

        {selectedMedia === 'none' && (
          <>
            <MediaFormatSelection>
              <RadioButton
                name="media-format"
                label="Vídeo"
                isChecked={clickedMediaSelector === VIDEO}
                onChange={() => setClickedMediaSelector(VIDEO)}
              />
              <RadioButton
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
              stretch
              onClick={handleUploadVideo}
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
              stretch
              onClick={() => handleUploadImageAsMain(postId, communitySlug)}
            />
          </>
        )}
      </UploadModalContainer>
    </Modal>
  );
};

export default UploadModal;
