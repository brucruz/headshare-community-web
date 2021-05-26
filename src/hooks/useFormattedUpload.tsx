import readableBytes from '../utils/readableBytes';
import { UploadInfoProps } from './useUploadFile';

interface UseFormattedUploadResponse {
  bytesSent: string;
  bytesTotal: string;
  progress: string;
}

export function useFormattedUpload(
  uploadInfo: UploadInfoProps,
): UseFormattedUploadResponse {
  const bytesSent =
    uploadInfo.bytesSent === 0 ? '0 Kb' : readableBytes(uploadInfo.bytesSent);
  const bytesTotal =
    uploadInfo.bytesTotal === 0 ? '0 Kb' : readableBytes(uploadInfo.bytesTotal);
  const progress = `${(uploadInfo.progress * 100).toFixed(1)}%`;

  return {
    bytesSent,
    bytesTotal,
    progress,
  };
}
