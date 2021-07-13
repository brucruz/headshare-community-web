/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useMemo, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { useSnackbar } from '../../hooks/useSnackbar';

import {
  MediaInputContainer,
  UploadArea,
  UploadContent,
} from '../../styles/components/MediaInput';
import { readFileAsDataURL } from './readFileAsDataURL';

export type ImageDimensions = { width: number; height: number };

export interface MediaInputProps {
  id?: string;
  name: string;
  label?: string;
  getFile: (file: File) => void;
  currentFileUrl?: string;
  fileType?: 'image' | 'video';
  getImageDimensions?: (arg: ImageDimensions) => void;
  getPreview?: (preview?: string) => void;
}

const MediaInput: React.FC<MediaInputProps> = ({
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id = name,
  label,
  getFile,
  currentFileUrl,
  fileType,
  getImageDimensions,
  children,
  getPreview,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(currentFileUrl);

  const { addSnackbar } = useSnackbar();

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
            mime: 'video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/x-flv, video/mpeg',
            types: '.mp4, .mov, .wmv, .avi, .flv e .mpeg',
          };

        default:
          return undefined;
      }
    }

    return undefined;
  }, [fileType]);

  const handleChange = useCallback(
    ({ target }) => {
      async function doFileRead(): Promise<void> {
        const { result, error } = await readFileAsDataURL(target.files[0]);
        result && setPreview(result);
        result && getPreview && getPreview(result);
        error && addSnackbar({ message: error });

        if (result && fileType === 'image') {
          const image = new Image();

          image.src = result;

          image.onload = async function retrieveImageDimensions() {
            getImageDimensions &&
              getImageDimensions({ width: image.width, height: image.height });
          };
        }
      }

      doFileRead();
      setFile(target.files[0]);
      getFile(target.files[0]);
    },
    [addSnackbar, fileType, getFile, getImageDimensions, getPreview],
  );

  return (
    <MediaInputContainer>
      <UploadArea htmlFor={name}>
        <input
          data-testid="media-input-upload-area-input"
          type="file"
          id={name}
          onChange={handleChange}
          accept={acceptedTypes?.mime}
        />

        {label && <p>{label}</p>}

        <UploadContent>
          {!preview && <BsUpload />}

          {preview && fileType === 'image' && (
            <>
              <img src={preview} alt="name" />

              <span>Alterar</span>
            </>
          )}

          {preview && fileType === 'video' && (
            <>
              <BsUpload />

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
