import styled, { css } from 'styled-components';
import { PostStatus } from '../../generated/graphql';
import device from '../../utils/devices';

interface PostCardContainerProps {
  isOwner: boolean;
}

export const PostCardContainer = styled.a<PostCardContainerProps>`
  width: 100%;
  background-color: var(--card-background);

  display: flex;
  flex-direction: column;

  ${props =>
    props.isOwner &&
    css`
      cursor: auto;
    `}

  & + a {
    margin-top: 10px;
  }

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

export const PostCardImageContainer = styled.div`
  border-radius: 6px;
  background-color: var(--gray-background);

  flex: 1 0 auto;

  @media ${device.tablet} {
    height: 174px;
    width: calc(174px * 16 / 9);
  }

  img {
    width: calc(100vw - 24px);
    height: calc((100vw - 24px) / 16 * 9);
    object-fit: cover;
    border-radius: 6px;

    @media ${device.tablet} {
      height: 174px;
      width: calc(174px * 16 / 9);
    }
  }
`;

export const PostCardImagePlaceholder = styled.div`
  width: calc(100vw - 24px);
  height: calc((100vw - 24px) / 16 * 9);

  @media ${device.tablet} {
    height: 174px;
    width: calc(174px * 16 / 9);
  }
`;

interface CardContentProps {
  exclusive?: boolean | null;
}

export const PostCardContent = styled.div<CardContentProps>`
  margin-top: 22px;
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;

  ${props =>
    props.exclusive === true &&
    css`
      margin-top: 5px;
    `}

  h5:first-child {
    color: #e74f4f;
  }

  @media ${device.tablet} {
    width: 100%;
  }
`;

export const PostCardUpperContent = styled.div`
  display: flex;

  flex: 1 0 auto;
`;

export const PostCardContentHeader = styled.div`
  width: 100%;

  h4 {
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    margin-bottom: 5px;

    @media ${device.laptop} {
      -webkit-line-clamp: 1;
    }
  }

  p {
    /* margin-top: 5px; */
    /* margin-bottom: 10px; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;

    @media ${device.laptop} {
      -webkit-line-clamp: 2;
    }
  }

  & + div {
    margin-left: 12px;
  }
`;

export const LikeCommentStatusContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
`;

interface StatusBadgeContainerProps {
  status: PostStatus;
}

export const StatusBadgeContainer = styled.div<StatusBadgeContainerProps>`
  width: 90px;
  height: 17px;

  border-radius: 8.5px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.laptop} {
    height: 20px;
    border-radius: 10px;
    width: 110px;
  }

  ${props => {
    switch (props.status) {
      case PostStatus.Published:
        return css`
          h5 {
            color: var(--success-color) !important;
          }
          background-color: var(--success-fade);
        `;

      case PostStatus.Scheduled:
        return css`
          h5 {
            color: var(--warning-color) !important;
          }
          background-color: var(--warning-fade);
        `;

      default:
        return css`
          h5 {
            color: var(--draft-color) !important;
          }
          background-color: var(--draft-fade);
        `;
    }
  }}
`;
