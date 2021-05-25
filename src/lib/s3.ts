import { S3 } from 'aws-sdk';
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
  try {
    await axios.put(signedRequest, file, options);
  } catch (err) {
    throw new Error(err);
  }
};

export type FormattedFilename = string;
export type FileExtension = string;
export type FormatS3Filename = [FormattedFilename, FileExtension];

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

export async function createSignedRequest(
  filename: string,
  filetype: string,
): Promise<{ signedRequest: string; url: string }> {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string;
  const secretAccessKey = process.env
    .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string;

  const client = new S3({
    region: process.env.AWS_DEFAULT_REGION as string,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const s3Bucket = 'headshare';

  const s3Params = {
    Bucket: s3Bucket,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
    ACL: 'public-read',
  };

  const signedRequest = await client.getSignedUrlPromise('putObject', s3Params);

  const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

  return {
    signedRequest,
    url,
  };
}
