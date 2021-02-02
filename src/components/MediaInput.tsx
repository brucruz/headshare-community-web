import { ChangeEvent, useCallback, useState } from 'react';
import { BsUpload } from 'react-icons/bs';

import {
  MediaInputContainer,
  UploadArea,
  UploadContent,
} from '../styles/components/MediaInput';

interface MediaInputProps {
  name: string;
  label: string;
  getFile: (file: File) => void;
  currentFileUrl?: string;
}

const MediaInput: React.FC<MediaInputProps> = ({
  name,
  label,
  getFile,
  currentFileUrl,
  children,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleMediaSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
        getFile(e.target.files[0]);
      }
    },
    [getFile],
  );

  return (
    <MediaInputContainer>
      <UploadArea htmlFor={name}>
        <input type="file" id={name} onChange={handleMediaSelect} />

        <p>{label}</p>

        <UploadContent>
          {!currentFileUrl && <BsUpload />}

          {children}
        </UploadContent>

        <h5>{(file && file.name) || 'Fazer upload de novo arquivo'}</h5>
      </UploadArea>
    </MediaInputContainer>
  );
};

export default MediaInput;
