import styled, { css } from 'styled-components';
import device from '../../utils/devices';

export const HomeContent = styled.main`
  max-width: 940px;
  margin: 0 auto;
`;

export const CategoriesPosts = styled.main`
  margin-top: 15px;

  padding-bottom: 10px;
  padding-left: 12px;
`;

export const CategoryContent = styled.section`
  h4 {
    color: var(--main-titles);

    cursor: pointer;
    width: fit-content;
  }

  h5 {
    color: var(--subtitles);
  }
`;

export const CategoryPosts = styled.section`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;

  display: flex;
  overflow-x: auto;
`;

export const EmptyCategory = styled.div`
  height: 173px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    color: var(--subtitles);
    text-align: center;

    svg {
      height: 45px;
      width: 45px;
    }

    p {
      width: 250px;
      margin-top: 10px;
    }
  }
`;

export const CategoryPost = styled.a`
  background-color: #f5f5f5;
  width: min-content;

  border-radius: 8px;

  cursor: pointer;

  img {
    border-radius: 8px 8px 0 0;
    height: 84px;
    width: 150px;
    object-fit: cover;

    @media ${device.laptop} {
      height: 101px;
      width: 180px;
    }
  }

  & + a {
    margin-left: 5px;
  }
`;

export const CategoryPostImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--gray-background);

  border-radius: 8px 8px 0 0;
  height: 84px;
  width: 150px;

  @media ${device.laptop} {
    height: 101px;
    width: 180px;
  }

  svg {
    height: 30px;
    width: 30px;

    color: var(--subtitles);
  }
`;

interface PostContentProps {
  exclusive?: boolean | null;
}

export const PostContent = styled.div<PostContentProps>`
  display: flex;
  flex-direction: column;
  height: 85px;

  @media ${device.laptop} {
    height: 105px;
  }

  padding-right: 5px;
  padding-left: 5px;
  padding-bottom: 12px;

  h5:first-child {
    color: #e74f4f;
  }

  p {
    flex: 1 1 auto;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;

    ${props =>
      !props.exclusive &&
      css`
        margin-top: 15px;
      `}
  }
`;

export const SeeMoreButton = styled.button`
  display: flex;
  flex-direction: column;
  color: #e74f4f;

  align-items: center;
  justify-content: center;
  white-space: nowrap;

  padding: 0 12px;

  svg {
    width: 40px;
    height: 40px;
  }

  h4 {
    text-align: center;
    color: #e74f4f;
  }
`;

export const CategoriesDetailContainer = styled.div`
  margin: 0 12px 40px 12px;

  /* width: calc(100% - 24px); */
`;
