import styled from 'styled-components';
import device from '../../utils/devices';

export const ImageVideoUpload = styled.button`
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 169px);
  /* min-height: 480px; */

  background-color: var(--gray-background);

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  svg:last-child {
    height: 50px;
    width: 50px;

    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

export const ImageVideoIcon = styled.div`
  position: absolute;

  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 169px);
  /* min-height: 480px; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageVideoUploading = styled.div`
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 169px);
  /* min-height: 480px; */

  background-color: var(--gray-background);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadStatus = styled.div`
  max-width: 600px;
  width: calc(100% - 60px);

  h5 {
    margin-top: 15px;
  }
`;

export const UploadStatusHeader = styled.div`
  display: flex;
`;

export const UploadStatusBarContainer = styled.div`
  border-radius: 6px;
  border: 1px solid var(--headshare-coral);

  width: 100%;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

interface UploadStatusBarProps {
  progress: number;
}

export const UploadStatusBar = styled.div<UploadStatusBarProps>`
  border-radius: 6px 0 0 6px;
  border: 1px solid var(--headshare-coral);
  background-color: var(--headshare-coral);

  height: 20px;

  ${props => {
    if (props.progress === 0) {
      return {
        display: 'none',
      };
    }
    return {
      display: 'block',
      width: `${(props.progress * 100).toFixed(2)}%`,
    };
  }};
`;

export const UploadPauseResumeButton = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid var(--headshare-coral);
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 5px;

  svg {
    color: var(--headshare-coral);
    width: 16px;
    height: 16px;
  }
`;

export const ContentWrapperArea = styled.main`
  display: flex;
  justify-content: center;

  margin: 25px 12px;

  width: calc(100% - 24px);
`;

export const ContentArea = styled.main`
  width: 100%;
  max-width: 1400px;

  @media ${device.laptop} {
    display: flex;
    justify-content: center;
  }
`;

export const PublishOptions = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  display: block;
  width: 100%;
  max-width: 400px;

  div + div {
    margin-top: 15px;
  }

  @media ${device.laptop} {
    margin-top: 0;
  }
`;

export const PublishOptionInput = styled.div`
  p {
    display: block;
    margin-bottom: 12px;

    font-weight: 600;
  }

  & + div {
    margin-top: 15px;
  }
`;

export const PublishOptionSwitch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PublishButton = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const ConfirmationModal = styled.div`
  margin-top: 15px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: var(--main-titles);
    width: 100%;
  }

  p {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  button:last-child {
    cursor: pointer;
    text-decoration: underline;
    margin-top: 10px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const VideoThumbnailContainer = styled.div`
  margin-top: 15px;
`;

export const VideoThumbnailPreview = styled.div`
  width: 100%;

  img {
    height: 84px;
  }
`;
