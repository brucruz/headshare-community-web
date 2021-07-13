import styled from 'styled-components';

export const PostCoverContainer = styled.section`
  width: 100%;

  border: 1px solid rgba(38, 50, 56, 0.16);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--page-background);
`;

export const ImageUploadIcon = styled.button`
  width: 100%;
  padding: 15px 0px;

  img {
    height: 68px;
    width: 68px;

    margin-top: 25px;
    margin-bottom: 25px;
    color: var(--input-placeholder);
  }
`;

export const ImagePreview = styled.div`
  width: 100%;

  img {
    max-width: 120px;
    max-height: 120px;
    object-fit: contain;

    margin: 15px 0px;
  }
`;
