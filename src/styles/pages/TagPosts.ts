import styled, { css } from 'styled-components';

export const PostCountContainer = styled.div`
  margin: 0 auto 0 12px;
  margin-top: 10px;
  width: fit-content;

  h5 {
    color: var(--subtitles);
  }
`;

export const TagPostsContainer = styled.div`
  margin-top: 20px;
`;

export const TagPostCard = styled.a`
  width: 100%;
  background-color: var(--card-background);

  display: flex;
  flex-direction: column;

  cursor: pointer;

  & + a {
    margin-top: 10px;
  }
`;

export const ImageContainer = styled.div`
  border-radius: 6px;
  width: 100%;
  height: 260px;
  background-color: var(--gray-background);

  img {
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
`;

export const ImagePlaceholder = styled.div;

interface CardContentProps {
  exclusive?: boolean | null;
}

export const CardContent = styled.div<CardContentProps>`
  margin-top: 22px;
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 15px;

  ${props =>
    props.exclusive === true &&
    css`
      margin-top: 5px;
    `}

  h5:first-child {
    color: #e74f4f;
  }

  p {
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  div {
    margin-top: 12px;
  }
`;

export const AllCategoriesButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  margin-left: 12px;
  margin-right: 12px;
`;
