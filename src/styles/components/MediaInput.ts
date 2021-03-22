import styled from 'styled-components';

export const MediaInputContainer = styled.div`
  position: relative;
`;

export const UploadArea = styled.label`
  border: 1px solid rgba(38, 50, 56, 0.16);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;

  background-color: var(--page-background);

  input {
    display: none;
  }

  p {
    position: absolute;
    top: -10px;
    left: 10px;

    background-color: var(--page-background);
  }

  h5 {
    margin-bottom: 8px;
    width: 100%;
    color: var(--input-placeholder);
  }
`;

export const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  svg {
    height: 24px;
    width: 24px;

    margin-top: 25px;
    margin-bottom: 15px;
    color: var(--input-placeholder);
  }

  img {
    max-width: 30%;
  }

  span {
    text-decoration: underline;
    color: var(--headshare-coral);
    margin-top: 15px;
  }
`;
