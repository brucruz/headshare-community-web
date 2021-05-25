import NextImage from 'next/image';
import { MdPause } from 'react-icons/md';
import { useEffect, useState } from 'react';
import {
  PostMainMediaContainer,
  ImageVideoIcon,
  ImageVideoUpload,
  UploadStatusBarContainer,
  UploadStatusBar,
  UploadStatusHeader,
  ImageVideoUploading,
  UploadPauseResumeButton,
  UploadStatus,
} from '../../styles/components/PostMainMedia';
import { Media } from '../Media';
import { useGetPostMainMediaQuery } from '../../generated/graphql';
import UploadModal from '../UploadModal';
import { UploadInfoProps } from '../../hooks/useUploadFile';

export interface PostMainMediaProps {
  postId: string;
  communitySlug: string;
}

export function PostMainMedia({
  postId,
  communitySlug,
}: PostMainMediaProps): JSX.Element {
  const [mainMediaState, setMainMediaState] = useState<
    'empty' | 'uploading' | 'ready'
  >('ready');
  const [uploadInfo, setUploadInfo] = useState<UploadInfoProps>({
    bytesSent: 0,
    bytesTotal: 0,
    progress: 0,
    mediaStatus: 'empty',
  });
  const [displayUploadModal, setDisplayUploadModal] = useState<boolean>(false);

  const { data } = useGetPostMainMediaQuery({
    variables: {
      id: postId,
    },
  });

  useEffect(() => {
    if (data?.findPostById?.post?.mainMedia) {
      setMainMediaState('ready');
    } else {
      setMainMediaState('empty');
    }
  }, [data?.findPostById?.post?.mainMedia]);

  return (
    <PostMainMediaContainer>
      {uploadInfo.mediaStatus === 'empty' && (
        <ImageVideoUpload
          type="button"
          onClick={() => setDisplayUploadModal(true)}
        >
          <ImageVideoIcon>
            <NextImage
              src="https://headshare.s3.amazonaws.com/assets/image_icon.png"
              height={100}
              width={100}
            />
          </ImageVideoIcon>
        </ImageVideoUpload>
      )}

      {uploadInfo.mediaStatus === 'uploading' && (
        <ImageVideoUploading>
          <UploadStatus>
            <UploadStatusHeader>
              <UploadStatusBarContainer>
                <UploadStatusBar progress={0.5} />
                {/* <UploadStatusBar progress={uploadInfo.progress} /> */}
              </UploadStatusBarContainer>
              <UploadPauseResumeButton>
                <MdPause />
              </UploadPauseResumeButton>
            </UploadStatusHeader>

            <h5>
              Uploaded 120kb of 240kb{' '}
              {/* Uploaded {formattedUpload.bytesSent} of {formattedUpload.bytesTotal}{' '} */}
              {/* ({formattedUpload.progress}) */}
            </h5>
          </UploadStatus>
        </ImageVideoUploading>
      )}

      {uploadInfo.mediaStatus === 'ready' &&
        data?.findPostById?.post?.mainMedia && (
          <Media
            mediaUrl={data?.findPostById?.post?.mainMedia.url}
            format={data?.findPostById?.post?.mainMedia.format}
            width={data?.findPostById?.post?.mainMedia?.width}
            height={data?.findPostById?.post?.mainMedia?.height}
            editClick={() => ''}
            removeClick={() => ''}
            // editClick={() => setDisplayMainMediaModal(!displayMainMediaModal)}
            // removeClick={() => removePostMainMedia()}
          />
        )}

      <UploadModal
        communitySlug={communitySlug}
        displayUploadModal={displayUploadModal}
        setDisplayUploadModal={() => setDisplayUploadModal(false)}
        postId={postId}
        passUploadInfo={args => setUploadInfo(args)}
        setMainMediaState={() => ''}
      />
    </PostMainMediaContainer>
  );
}
