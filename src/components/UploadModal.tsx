import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import * as tus from 'tus-js-client';

import { IMAGE, VIDEO } from '../constants/mediaFormat';
import {
  useUploadVideoMutation,
  MediaFormat,
  Media,
} from '../generated/graphql';
import {
  MediaFormatSelection,
  UploadModalContainer,
  UploadHeaderContainer,
  VideoUploadOptions,
} from '../styles/components/UploadModal';
import Button from './Button';
import MediaInput from './MediaInput';
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
    '_id' | 'url' | 'thumbnailUrl' | 'uploadLink' | 'file' | 'format'
  > | null;
}

interface UploadModalProps {
  communitySlug: string;
  mediaInitialSelection?: SelectedMediaProps;
  displayUploadModal: boolean;
  setDisplayUploadModal: (args: boolean) => void;
  setMainMediaState: (args: 'empty' | 'uploading' | 'ready') => void;
  passUploadInfo: (args: UploadInfoProps) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  communitySlug,
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

  const [uploadVideo] = useUploadVideoMutation();

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

  return (
    <Modal
      isOpen={displayUploadModal}
      setIsOpen={() => setDisplayUploadModal(false)}
    >
      <UploadModalContainer>
        <UploadHeaderContainer>
          <button type="button" onClick={() => setDisplayUploadModal(false)}>
            <MdClose />
          </button>

          <h2>{state.title}</h2>
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
              />
            </VideoUploadOptions>

            <Button
              text={state.buttonTitle}
              stretch
              onClick={handleUploadVideo}
            />
          </>
        )}
      </UploadModalContainer>
    </Modal>
  );
};

export default UploadModal;
