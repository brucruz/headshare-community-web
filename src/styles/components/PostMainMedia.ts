import styled from 'styled-components';

export const PostMainMediaContainer = styled.section``;

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
