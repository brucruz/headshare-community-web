import axios from 'axios';
import format from 'date-fns/format';

export const uploadToS3 = async (
  file: File,
  signedRequest: string,
): Promise<void> => {
  const options = {
    headers: {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read',
    },
  };
  await axios.put(signedRequest, file, options);
};

type FormattedFilename = string;
type FileExtension = string;
type FormatS3Filename = [FormattedFilename, FileExtension];

export const formatS3Filename = (
  filename: string,
  communitySlug: string,
): FormatS3Filename => {
  const date = format(Date.now(), 'yyyyMMdd');
  const randomString = Math.random().toString(36).substring(2, 7);

  const lowerCase = filename.toLocaleLowerCase();
  function getFileComponents(name: string): string[] {
    const array = name.split('.');
    const { length } = array;

    const fileExtension = array[length - 1];
    array.splice(length - 1);

    const primaryName = array.toString();

    return [fileExtension, primaryName];
  }

  const [fileExtension, primaryName] = getFileComponents(lowerCase);

  const cleanFileName = primaryName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const newFilename = `${communitySlug}/images/${date}-${randomString}-${cleanFileName}.${fileExtension}`;
  return [newFilename.substring(0, 60), `.${fileExtension}`];
};
