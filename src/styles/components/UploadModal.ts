import styled from 'styled-components';

export const UploadModalContainer = styled.div`
  margin-top: 15px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
`;

export const UploadHeaderContainer = styled.div`
  h2 {
    color: var(--main-titles);
  }

  button {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    margin-bottom: 5px;

    svg {
      height: 24px;
      width: 24px;
    }
  }
`;

export const MediaFormatSelection = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;

  label {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

export const VideoUploadOptions = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
`;
