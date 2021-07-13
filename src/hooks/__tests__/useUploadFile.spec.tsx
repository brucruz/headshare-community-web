import fs from 'fs';
import path from 'path';
import { useUploadFile } from '../useUploadFile';
import { MediaFormat } from '../../generated/graphql';
import { FormatS3Filename } from '../../lib/s3';
import { renderHook, act, cleanup } from '../../test/hooksTestUtils';

/* 
  Unable to test the upload flow for videos at the moment. Tus upload could not be tested yet.
*/

beforeEach(() => {
  cleanup();
});

function mockedCreateSignedRequest(filename: string): string {
  return `https://headshare.s3.amazonaws.com/${filename}`;
}

function mockedFormatS3Filename(
  filename: string,
  communitySlug: string,
): FormatS3Filename {
  return [
    `https://headshare.s3.amazonaws.com/${communitySlug}/${filename}`,
    '.jpg',
  ];
}

jest.mock('../../lib/s3', () => ({
  uploadToS3: () => jest.fn(),
  formatS3Filename: mockedFormatS3Filename,
}));

describe('useUploadFile hook', () => {
  const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'temp');

  const communitySlug = 'test';

  it('should upload a image', async () => {
    const filename = 'sampleImage.jpg';
    const imageFile = path.resolve(tmpFolder, filename);
    const buffer = fs.readFileSync(imageFile);
    const file = new File([buffer], filename);

    const uploadLink = mockedCreateSignedRequest(filename);

    const format = MediaFormat.Image;

    const { result, waitForValueToChange } = renderHook(() => useUploadFile());

    act(() => {
      result.current[1]({
        communitySlug,
        file,
        format,
        uploadCallback: async () => ({
          callbackStatus: 'success',
          uploadLink,
        }),
      });
    });

    await waitForValueToChange(() => result.current[0].status);

    expect(result.current[0].status).toBe('finished');
    expect(result.current[0].progress).toBe(1);
    expect(result.current[0].bytesSent).toBe(file.size);
    expect(result.current[0].bytesTotal).toBe(file.size);
  });
});
