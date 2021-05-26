import { useCallback, useRef, useState } from 'react';
import * as tus from 'tus-js-client';

import { MediaFormat } from '../generated/graphql';
import { formatS3Filename, uploadToS3 } from '../lib/s3';
import { useSnackbar } from './useSnackbar';

export type UploadCallbackStatus = 'success' | 'error';

export interface UploadCallbackResponse {
  callbackStatus: UploadCallbackStatus;
  uploadLink?: string;
  message?: string;
}

export interface UseUploadFileProps {
  format: MediaFormat;
  file: File;
  communitySlug: string;
  uploadCallback: (
    fileName?: string,
    fileExtension?: string,
    file?: File | undefined,
  ) => Promise<UploadCallbackResponse>;
}

export type UploadMediaProps = ({
  communitySlug,
  file,
  format,
  uploadCallback,
}: UseUploadFileProps) => void;

export interface UploadInfoProps {
  bytesSent: number;
  bytesTotal: number;
  progress: number;
  status?: 'started' | 'paused' | 'finished' | 'errored';
  error?: string;
}

export type UploadFileResponse = [UploadInfoProps, UploadMediaProps];

export function useUploadFile(): UploadFileResponse {
  const { addSnackbar } = useSnackbar();
  const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
    bytesSent: 0,
    bytesTotal: 0,
    progress: 0,
  });
  const upload = useRef<tus.Upload>();

  const handleUploadFailing = useCallback(
    (fileSize: number, errorMessage?: string) => {
      // Insert Snackbar with error detail and retry option
      errorMessage && addSnackbar({ message: errorMessage });

      setUploadInfo(oldState => ({
        status: 'errored',
        bytesSent: oldState.bytesSent,
        bytesTotal: fileSize,
        progress: oldState.progress,
      }));
    },
    [addSnackbar],
  );

  const handleUploadSuccess = useCallback((fileSize: number) => {
    setUploadInfo({
      status: 'finished',
      bytesSent: fileSize,
      bytesTotal: fileSize,
      progress: 1,
    });
  }, []);

  const uploadImage = useCallback(
    async (
      file: File,
      fileName: string,
      fileExtension: string,
      uploadCallback: (
        filename?: string,
        fileextension?: string,
        imageFile?: File | undefined,
      ) => Promise<UploadCallbackResponse>,
    ) => {
      setUploadInfo(oldState => ({
        bytesSent: oldState.bytesSent,
        bytesTotal: oldState.bytesTotal,
        progress: oldState.progress,
        status: 'started',
      }));

      const { callbackStatus, message, uploadLink } = await uploadCallback(
        fileName,
        fileExtension,
        file,
      );

      if (callbackStatus === 'error') {
        handleUploadFailing(file.size, message);
      }

      if (callbackStatus === 'success' && uploadLink) {
        try {
          await uploadToS3(file, uploadLink);

          handleUploadSuccess(file.size);
        } catch (err) {
          addSnackbar({
            message: 'We could not process you media upload. Try again later',
          });
        }
      }
    },
    [addSnackbar, handleUploadFailing, handleUploadSuccess],
  );

  const uploadVideo = useCallback(
    async (
      file: File,
      fileName: string | undefined,
      fileExtension: string | undefined,
      uploadCallback: (
        filename?: string,
        fileextension?: string,
        videoFile?: File | undefined,
      ) => Promise<UploadCallbackResponse>,
    ) => {
      setUploadInfo(oldState => ({
        bytesSent: oldState.bytesSent,
        bytesTotal: oldState.bytesTotal,
        progress: oldState.progress,
        status: 'started',
      }));

      const { callbackStatus, message, uploadLink } = await uploadCallback(
        fileName,
        fileExtension,
        file,
      );

      if (callbackStatus === 'error') {
        handleUploadFailing(file.size, message);
      }

      if (callbackStatus === 'success') {
        upload.current = new tus.Upload(file, {
          uploadUrl: uploadLink,
          onError(error) {
            handleUploadFailing(file.size, error.message);
          },

          onProgress(bytesSent: number, bytesTotal: number) {
            const progress = bytesSent / bytesTotal;

            setUploadInfo({
              bytesSent,
              bytesTotal,
              progress,
              status: 'started',
            });
          },
          onSuccess() {
            handleUploadSuccess(file.size);
          },
        });

        upload.current.start();
      }
    },
    [handleUploadFailing, handleUploadSuccess],
  );

  const uploadMedia = useCallback(
    ({ communitySlug, file, format, uploadCallback }: UseUploadFileProps) => {
      setUploadInfo(oldState => ({
        bytesSent: oldState.bytesSent,
        bytesTotal: oldState.bytesTotal,
        progress: oldState.progress,
        status: 'started',
      }));

      if (format === MediaFormat.Image) {
        const [fileName, fileExtension] = formatS3Filename(
          file.name,
          communitySlug,
        );

        uploadImage(file, fileName, fileExtension, uploadCallback);
      }

      if (format === MediaFormat.Video) {
        uploadVideo(file, undefined, undefined, uploadCallback);
      }
    },
    [uploadImage, uploadVideo],
  );

  return [uploadInfo, uploadMedia];
}
