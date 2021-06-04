import { useCallback, useEffect, useMemo, useState } from 'react';

import { IMAGE, VIDEO } from '../../constants/mediaFormat';
import { MediaFormat } from '../../generated/graphql';
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
  UploadInfoProps,
  useUploadFile,
} from '../../hooks/useUploadFile';

type SelectedMediaProps = 'image' | 'video' | 'none';

export interface UploadModalProps {
  communitySlug: string;
  displayUploadModal: boolean;
  setDisplayUploadModal: (args: boolean) => void;
  passUploadInfo: (args: UploadInfoProps) => void;
  getImageDimensions?: (arg: ImageDimensions) => void;
  getPreview?: (preview?: string) => void;
  imageUploadCallback?(
    fileName?: string,
    fileExtension?: string,
    imageFile?: File,
  ): Promise<UploadCallbackResponse>;
  videoUploadCallback?(
    fileName?: string,
    fileExtension?: string,
    videoFile?: File,
  ): Promise<UploadCallbackResponse>;
  acceptedMediaFormats?: Exclude<SelectedMediaProps, 'none'>[];
}

export function UploadModal({
  communitySlug,
  displayUploadModal,
  setDisplayUploadModal,
  passUploadInfo,
  getImageDimensions,
  getPreview,
  imageUploadCallback,
  videoUploadCallback,
  acceptedMediaFormats = ['image', 'video'],
}: UploadModalProps): JSX.Element {
  const initialMediaState = useMemo(
    () => (acceptedMediaFormats.length > 1 ? 'none' : acceptedMediaFormats[0]),
    [acceptedMediaFormats],
  );
  const [selectedMedia, setSelectedMedia] =
    useState<SelectedMediaProps>(initialMediaState);
  const [clickedMediaSelector, setClickedMediaSelector] =
    useState<SelectedMediaProps>('none');
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
      videoUploadCallback &&
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

  const handleUploadImage = useCallback(
    async (commSlug: string, imageFile: File) => {
      imageUploadCallback &&
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

    setSelectedMedia(initialMediaState);
  }, [initialMediaState, setDisplayUploadModal]);

  return (
    <Modal isOpen={displayUploadModal} setIsOpen={closeUploadModal} closeButton>
      <UploadModalContainer>
        <UploadHeaderContainer>
          <StateHeader>
            {selectedMedia !== 'none' && acceptedMediaFormats.length > 1 && (
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
              {acceptedMediaFormats.find(format => format === 'video') && (
                <RadioInput
                  name="video-media-format"
                  label="Vídeo"
                  isChecked={clickedMediaSelector === VIDEO}
                  onChange={() => setClickedMediaSelector(VIDEO)}
                  value={MediaFormat.Video}
                />
              )}
              {acceptedMediaFormats.find(format => format === 'image') && (
                <RadioInput
                  name="image-media-format"
                  label="Imagem"
                  isChecked={clickedMediaSelector === IMAGE}
                  onChange={() => setClickedMediaSelector(IMAGE)}
                  value={MediaFormat.Image}
                />
              )}
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
                getPreview={preview => getPreview && getPreview(preview)}
              />
            </VideoUploadOptions>

            <Button
              text={state.buttonTitle}
              disabled={!selectedFile}
              stretch
              onClick={() =>
                selectedFile && handleUploadImage(communitySlug, selectedFile)
              }
            />
          </>
        )}
      </UploadModalContainer>
    </Modal>
  );
}
