import { animated } from 'react-spring';
import styled, { css } from 'styled-components';
import device from '../../utils/devices';

export const HeaderContainer = styled.header`
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02),
    0px 1px 12px rgba(0, 0, 0, 0.12);
  border-radius: 0px 0px 8px 8px;
  width: 100%;

  background: #fafafa;
  position: fixed;

  z-index: 100;
`;

export const HeaderContent = styled.div`
  padding: 0 12px;
  display: flex;
  height: 56px;
  align-items: center;

  @media ${device.laptop} {
    height: 76px;
  }
`;

export const LogoContainer = styled.div`
  height: 30px;
  width: 30px;
  flex: 0 0 auto;

  cursor: pointer;
`;

export const CommunityTitle = styled.div`
  flex: 1 0 auto;
  margin: 17px 10px;

  button {
    cursor: pointer;
    h4 {
      width: fit-content;
      overflow-wrap: break-word;
    }
  }
`;

export const HoverSideMenu = styled.div`
  flex: 0 0 auto;

  @media ${device.laptopL} {
    display: none;
  }
`;

export const HamburguerContainer = styled.button`
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 10px;

  svg {
    width: 30px;
    height: 30px;

    color: var(--subtitles);
  }

  @media ${device.laptop} {
    height: 40px;
    width: 40px;

    svg {
      width: 40px;
      height: 40px;

      color: var(--subtitles);
    }
  }
`;

export const HoverSideMenuContainer = styled(animated.aside)`
  width: 300px;
  height: calc(100vh - 50px);
  background-color: var(--page-background);
  border-radius: 8px 0px 0px 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  position: absolute;
  right: 0;
  top: 56px;

  padding: 30px 0 10px 0;
`;

interface MenuItemProps {
  noHover?: boolean;
  disabled?: boolean;
}

export const MenuItem = styled.li<MenuItemProps>`
  margin: 0 15px;
  padding: 10px 0;
  list-style-type: none;
  min-width: 80px;
  ${props =>
    !props.noHover &&
    css`
      cursor: pointer;
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  text-align: left;
  font-size: 14px;
  color: var(--gray-text);

  &:hover {
    ${props =>
      !props.noHover &&
      css`
        font-weight: 500;
      `}
  }
`;

export const PostSaveStatus = styled.div`
  margin-right: 10px;

  h5 {
    color: var(--subtitles);
  }
`;

export const MenuIcons = styled.ul`
  display: flex;
`;

export const AddMenuIcon = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
    color: var(--subtitles);
  }

  @media ${device.laptop} {
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

export const UserMenuIcon = styled.div`
  border-radius: 50%;
  background-color: var(--gray-background);
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 22px;
    height: 22px;
    color: var(--subtitles);
  }

  @media ${device.laptop} {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const UserMenuHeader = styled.li`
  padding: 10px 15px;

  display: flex;
  align-items: center;

  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid var(--gray-background);
`;

export const UserMenuHeaderAvatar = styled.div`
  border-radius: 50%;
  background-color: var(--gray-background);
  width: 45px;
  height: 45px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 31px;
    height: 31px;
    color: var(--subtitles);
  }

  @media ${device.laptop} {
    width: 50px;
    height: 50px;

    svg {
      width: 35px;
      height: 35px;
    }
  }
`;

export const UserMenuHeaderAvatarContent = styled.div`
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;

    border-radius: 50%;
  }
`;

export const UserMenuHeaderInfo = styled.div`
  margin-left: 10px;

  h4 {
    color: var(--main-titles);
  }

  h5 {
    color: var(--gray-text);
    font-weight: 400;
  }

  @media ${device.laptop} {
    margin-left: 15px;
  }
`;
