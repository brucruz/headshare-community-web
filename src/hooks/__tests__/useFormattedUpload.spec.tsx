import { renderHook, cleanup } from '../../test/hooksTestUtils';
import readableBytes from '../../utils/readableBytes';
import { useFormattedUpload } from '../useFormattedUpload';
import { UploadInfoProps } from '../useUploadFile';

beforeEach(() => {
  cleanup();
});

describe('useFormattedUpload hook', () => {
  it('should format upload information to be readable by humans', () => {
    const uploadInfo: UploadInfoProps = {
      bytesSent: 2 * 1024 * 1024 * 1024, // 2 Gigabytes
      bytesTotal: 5 * 1024 * 1024 * 1024, // 5 Gigabytes
      progress: (2 * 1024 * 1024 * 1024) / (5 * 1024 * 1024 * 1024), // 2 / 5 or 40%
    };
    const formattedBytesSent = readableBytes(uploadInfo.bytesSent);
    const formattedBytesTotal = readableBytes(uploadInfo.bytesTotal);
    const formattedProgress = `${(uploadInfo.progress * 100).toFixed(1)}%`;

    const { result } = renderHook(() => useFormattedUpload(uploadInfo));

    expect(result.current.bytesSent).toEqual(formattedBytesSent);
    expect(result.current.bytesTotal).toEqual(formattedBytesTotal);
    expect(result.current.progress).toEqual(formattedProgress);
  });
});
