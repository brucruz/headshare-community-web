import { useCallback, useEffect, useMemo, useState } from 'react';

import { IMAGE, VIDEO } from '../../constants/mediaFormat';
import { MediaFormat, Media } from '../../generated/graphql';
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
  mediaInitialSelection?: SelectedMediaProps;
  displayUploadModal: boolean;
  setDisplayUploadModal: (args: boolean) => void;
  passUploadInfo: (args: UploadInfoProps) => void;
  getImageDimensions?: (arg: ImageDimensions) => void;
  imageUploadCallback(
    fileName?: string,
    fileExtension?: string,
    imageFile?: File,
  ): Promise<UploadCallbackResponse>;
  videoUploadCallback(
    fileName?: string,
    fileExtension?: string,
    videoFile?: File,
  ): Promise<UploadCallbackResponse>;
}

export function UploadModal({
  communitySlug,
  mediaInitialSelection = 'none',
  displayUploadModal,
  setDisplayUploadModal,
  passUploadInfo,
  getImageDimensions,
  imageUploadCallback,
  videoUploadCallback,
}: UploadModalProps): JSX.Element {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMediaProps>(
    mediaInitialSelection,
  );
  const [
    clickedMediaSelector,
    setClickedMediaSelector,
  ] = useState<SelectedMediaProps>('none');
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const [uploadInfo, uploadMedia] = useUploadFile();

  useEffect(() => {
    passUploadInfo(uploadInfo);
  }, [uploadInfo, passUploadInfo]);

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

  const handleUploadVideo = useCallback(
    async (commSlug: string, videoFile: File) => {
      uploadMedia({
        communitySlug: commSlug,
        format: MediaFormat.Video,
        file: videoFile,
        uploadCallback: videoUploadCallback,
      });

      setDisplayUploadModal(false);
    },
    [uploadMedia, videoUploadCallback, setDisplayUploadModal],
  );

  const handleUploadImageAsMain = useCallback(
    async (commSlug: string, imageFile: File) => {
      uploadMedia({
        communitySlug: commSlug,
        format: MediaFormat.Image,
        file: imageFile,
        uploadCallback: imageUploadCallback,
      });

      setDisplayUploadModal(false);
    },
    [uploadMedia, imageUploadCallback, setDisplayUploadModal],
  );

  const closeUploadModal = useCallback(() => {
    setDisplayUploadModal(false);

    setClickedMediaSelector('none');

    setSelectedMedia('none');
  }, [setDisplayUploadModal]);

  return (
    <Modal
      data-test-id="upload-modal"
      isOpen={displayUploadModal}
      setIsOpen={closeUploadModal}
      closeButton
    >
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
                name="video-media-format"
                label="Vídeo"
                isChecked={clickedMediaSelector === VIDEO}
                onChange={() => setClickedMediaSelector(VIDEO)}
                value={MediaFormat.Video}
              />
              <RadioInput
                name="image-media-format"
                label="Imagem"
                isChecked={clickedMediaSelector === IMAGE}
                onChange={() => setClickedMediaSelector(IMAGE)}
                value={MediaFormat.Image}
              />
            </MediaFormatSelection>

            <Button
              text={state.buttonTitle}
              stretch
              onClick={() => setSelectedMedia(clickedMediaSelector)}
            />
          </>
        )}

        {selectedMedia === VIDEO && (
          <>
            <VideoUploadOptions>
              <MediaInput
                name="main-video"
                label="Selecione um arquivo"
                getFile={file => setSelectedFile(file)}
                fileType="video"
              />
            </VideoUploadOptions>

            <Button
              text={state.buttonTitle}
              disabled={!selectedFile}
              stretch
              onClick={() =>
                selectedFile && handleUploadVideo(communitySlug, selectedFile)
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
                getFile={file => setSelectedFile(file)}
                fileType="image"
                getImageDimensions={getImageDimensions}
              />
            </VideoUploadOptions>

            <Button
              text={state.buttonTitle}
              disabled={!selectedFile}
              stretch
              onClick={() =>
                selectedFile &&
                handleUploadImageAsMain(communitySlug, selectedFile)
              }
            />
          </>
        )}
      </UploadModalContainer>
    </Modal>
  );
}
