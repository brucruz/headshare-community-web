import fs from 'fs';
import path from 'path';
import { cleanup, fireEvent, render, waitFor } from '../../test/testUtils';
import { UploadModal } from '.';
import { UploadCallbackResponse } from '../../hooks/useUploadFile';
import { FormatS3Filename } from '../../lib/s3';
import { ImageDimensions } from '../MediaInput';

/* 
  Unable to test "should be able to get and pass an image dimensions"
  due to missing Image onload mock
*/

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

jest.mock('tus-js-client');

const uploadCallbackMockedResponse = jest.fn(
  (status: 'success' | 'error'): UploadCallbackResponse => {
    if (status === 'success') {
      return {
        callbackStatus: 'success',
      };
    }

    return {
      callbackStatus: 'error',
    };
  },
);

const uploadCallbackMock = jest.fn(
  async (
    fileName?: string | undefined,
    fileExtension?: string | undefined,
    file?: File | undefined,
  ): Promise<UploadCallbackResponse> => {
    if (file) {
      return uploadCallbackMockedResponse('success');
    }

    return uploadCallbackMockedResponse('error');
  },
);

const mockedImageDimensions = jest.fn((args: ImageDimensions): void => {
  args;
});

beforeEach(() => {
  cleanup;
  uploadCallbackMock.mockClear();
  uploadCallbackMockedResponse.mockClear();
});

describe('UploadModal component', () => {
  const uploadModal = (
    <UploadModal
      communitySlug="nihongo"
      displayUploadModal
      imageUploadCallback={uploadCallbackMock}
      videoUploadCallback={uploadCallbackMock}
      passUploadInfo={args => {
        args;
      }}
      setDisplayUploadModal={args => {
        args;
      }}
      getImageDimensions={mockedImageDimensions}
    />
  );

  const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'temp');

  it('should be able to render an modal', () => {
    const { getByTestId } = render(uploadModal);

    expect(getByTestId('modal')).toBeTruthy;
    expect(getByTestId('modal-overlay')).toBeTruthy;
    expect(getByTestId('modal-container')).toBeTruthy;
  });

  it('should be able to get an selected image from media input', async () => {
    const filename = 'sampleImage.jpg';
    const imageFile = path.resolve(tmpFolder, filename);
    const buffer = fs.readFileSync(imageFile);
    const file = new File([buffer], filename);

    const { getByTestId, container, getByText } = render(uploadModal);

    const imageRadioInput = container.querySelector('#image-media-format');
    imageRadioInput && fireEvent.click(imageRadioInput);

    const chooseMediaButton = getByText('Prosseguir');
    fireEvent.click(chooseMediaButton);

    const title = getByText('Selecione um arquivo de imagem');
    expect(title.textContent).toEqual('Selecione um arquivo de imagem');

    const mediaInputUploadAreaInput = getByTestId(
      'media-input-upload-area-input',
    );
    fireEvent.change(mediaInputUploadAreaInput, {
      target: { files: [file] },
    });
    await waitFor(() => {
      expect(getByText('Alterar').textContent).toEqual('Alterar');
    });

    const loadMediaButton = getByText('Carregar');
    fireEvent.click(loadMediaButton);

    expect(uploadCallbackMockedResponse).toHaveBeenCalledWith('success');
    expect(uploadCallbackMockedResponse).not.toHaveBeenCalledWith('error');
  });

  it('should be able to get an selected video from media input', async () => {
    const filename = 'sampleVideo.mp4';
    const videoFile = path.resolve(tmpFolder, filename);
    const buffer = fs.readFileSync(videoFile);
    const file = new File([buffer], filename);

    const { getByTestId, container, getByText } = render(uploadModal);

    const videoRadioInput = container.querySelector('#video-media-format');
    videoRadioInput && fireEvent.click(videoRadioInput);

    const chooseMediaButton = getByText('Prosseguir');
    fireEvent.click(chooseMediaButton);

    const title = getByText('Selecione um arquivo de vídeo');
    expect(title.textContent).toEqual('Selecione um arquivo de vídeo');

    const mediaInputUploadAreaInput = getByTestId(
      'media-input-upload-area-input',
    );
    fireEvent.change(mediaInputUploadAreaInput, {
      target: { files: [file] },
    });
    await waitFor(() => {
      expect(getByText('Alterar').textContent).toEqual('Alterar');
    });

    const loadMediaButton = getByText('Carregar');
    fireEvent.click(loadMediaButton);

    expect(uploadCallbackMockedResponse).toHaveBeenCalledWith('success');
    expect(uploadCallbackMockedResponse).not.toHaveBeenCalledWith('error');
  });

  it.skip('should be able to get and pass an image dimensions', async () => {
    const filename = 'sampleImage.jpg';
    const imageFile = path.resolve(tmpFolder, filename);
    const buffer = fs.readFileSync(imageFile);
    const file = new File([buffer], filename);

    const { getByTestId, container, getByText } = render(uploadModal);

    const imageRadioInput = container.querySelector('#image-media-format');
    imageRadioInput && fireEvent.click(imageRadioInput);

    const chooseMediaButton = getByText('Prosseguir');
    fireEvent.click(chooseMediaButton);

    const title = getByText('Selecione um arquivo de imagem');
    expect(title.textContent).toEqual('Selecione um arquivo de imagem');

    const mediaInputUploadAreaInput = getByTestId(
      'media-input-upload-area-input',
    );
    fireEvent.change(mediaInputUploadAreaInput, {
      target: { files: [file] },
    });
    await waitFor(() => {
      expect(getByText('Alterar').textContent).toEqual('Alterar');
    });

    const loadMediaButton = getByText('Carregar');
    fireEvent.click(loadMediaButton);

    expect(mockedImageDimensions).toHaveBeenCalled();
  });
});
