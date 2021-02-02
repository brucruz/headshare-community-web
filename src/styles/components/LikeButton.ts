import styled, { css } from 'styled-components';

interface LikeContainerProps {
  liked: boolean;
}

export const LikeContainer = styled.div<LikeContainerProps>`
  display: flex;

  svg {
    width: 18px;
    height: 18px;

    margin-right: 5px;

    ${props =>
      props.liked
        ? css`
            color: #e74f4f;
          `
        : css`
            color: #3e3e3e;
          `}
  }

  h5 {
    color: #3e3e3e;
  }
`;
