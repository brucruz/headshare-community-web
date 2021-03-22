import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { BsUpload } from 'react-icons/bs';

import {
  MediaInputContainer,
  UploadArea,
  UploadContent,
} from '../styles/components/MediaInput';
import Button from './Button';

export type ImageDimensions = { width: number; height: number };

export interface MediaInputProps {
  id?: string;
  name: string;
  label?: string;
  getFile: (file: File) => void;
  currentFileUrl?: string;
  fileType?: 'image' | 'video';
  getImageDimensions?: (arg: ImageDimensions) => void;
}

const MediaInput: React.FC<MediaInputProps> = ({
  name,
  id = name,
  label,
  getFile,
  currentFileUrl,
  fileType,
  getImageDimensions,
  children,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const acceptedTypes = useMemo(():
    | { mime: string; types: string }
    | undefined => {
    if (fileType) {
      switch (fileType) {
        case 'image':
          return {
            mime: 'image/png, image/jpeg',
            types: '.png e .jpeg',
          };

        case 'video':
          return {
            mime:
              'video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/x-flv, video/mpeg',
            types: '.mp4, .mov, .wmv, .avi, .flv e .mpeg',
          };

        default:
          return undefined;
      }
    }

    return undefined;
  }, [fileType]);

  const handleMediaSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const inputFile = e.target.files[0];

        if (fileType === 'image') {
          const image = new Image();

          const fr = new FileReader();

          fr.onload = function setImageSrc() {
            if (fr !== null && typeof fr.result === 'string') {
              image.src = fr.result;
            }
          };
          fr.readAsDataURL(inputFile);

          image.onload = async function retrieveImageDimensions() {
            getImageDimensions &&
              getImageDimensions({ width: image.width, height: image.height });
          };
        }

        setFile(e.target.files[0]);
        getFile(e.target.files[0]);
      }
    },
    [fileType, getFile, getImageDimensions],
  );

  return (
    <MediaInputContainer>
      <UploadArea htmlFor={name}>
        <input
          type="file"
          id={name}
          onChange={handleMediaSelect}
          accept={acceptedTypes?.mime}
        />

        {label && <p>{label}</p>}

        <UploadContent>
          {!currentFileUrl && <BsUpload />}

          {currentFileUrl && (
            <>
              <img src={currentFileUrl} alt="name" />

              <span>Alterar</span>
            </>
          )}

          {children}
        </UploadContent>

        <h5>
          {(file && file.name) ||
            `Formatos aceitos: ${acceptedTypes?.types || 'todos'}`}
        </h5>
      </UploadArea>
    </MediaInputContainer>
  );
};

export default MediaInput;
