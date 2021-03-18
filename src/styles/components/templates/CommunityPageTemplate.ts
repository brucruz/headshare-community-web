import styled from 'styled-components';

export const CommunityPageTemplateContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

export const BannerContainer = styled.div`
  max-width: 940px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0px 0px 8px 8px;
  }

  label {
    width: 100%;
    border-radius: 0px 0px 8px 8px;
    height: 180px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--gray-background);

    svg {
      height: 35px;
      width: 35px;

      color: var(--subtitles);
    }

    input {
      display: none;
    }
  }
`;

export const AvatarHeader = styled.section`
  margin-top: -52px;
  margin-left: 12px;
  margin-right: 12px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Avatar = styled.div`
  height: 100px;
  width: 100px;

  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
    background: #e8e8e8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  label {
    border-radius: 100%;
    width: auto;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--gray-background);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    svg {
      height: 25px;
      width: 25px;

      color: var(--subtitles);
    }

    input {
      display: none;
    }
  }
`;

export const MemberCount = styled.div`
  margin-top: 4px;
  margin-left: 12px;

  h5 {
    color: #5a5a5a;
  }
`;

interface ChildrenContainerProps {
  maxWidth?: number;
}

export const ChildrenContainer = styled.div<ChildrenContainerProps>`
  margin: 0 auto;
  max-width: ${props => (props.maxWidth ? props.maxWidth : 940)}px;
`;
