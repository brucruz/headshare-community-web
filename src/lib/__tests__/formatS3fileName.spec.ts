import { formatS3Filename } from '../s3';

describe('a filename', () => {
  it('should be formated as unique before being uploaded to S3', () => {
    const communitySlug = 'test-community';
    const filename = 'sample.png';

    const [formattedFilename1] = formatS3Filename(filename, communitySlug);
    const [formattedFilename2] = formatS3Filename(filename, communitySlug);
    const [formattedFilename3] = formatS3Filename(filename, communitySlug);

    expect(formattedFilename1 === formattedFilename2).toBeFalsy();
    expect(formattedFilename1 === formattedFilename3).toBeFalsy();
    expect(formattedFilename2 === formattedFilename3).toBeFalsy();
  });

  it('should be formatted with the community slug as upper folder', () => {
    const communitySlug = 'test-community';
    const filename = 'sample.png';

    const [formattedFilename] = formatS3Filename(filename, communitySlug);

    const upperFolder = formattedFilename.split('/')[0];

    expect(upperFolder).toEqual(communitySlug);
  });

  it('should return the correct file extension that should match the filename extension', () => {
    const communitySlug = 'test-community';
    const filename = 'sample.png.jpg';
    const fileExtension = '.jpg';
    const fakeFileExtension = '.png';

    const [_, generatedFileExtension] = formatS3Filename(
      filename,
      communitySlug,
    );

    expect(generatedFileExtension).toEqual(fileExtension);
    expect(generatedFileExtension === fakeFileExtension).toBeFalsy();
  });
});
