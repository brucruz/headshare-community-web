import styled from 'styled-components';

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
`;

export const LogoContainer = styled.div`
  height: 30px;
  width: 30px;
  flex: 0 0 auto;
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

export const Menu = styled.div`
  flex: 0 0 auto;
  /* margin: 8px 0px; */
  position: relative;
`;

export const HamburguerContainer = styled.button`
  height: 40px;
  width: 40px;
`;

export const MenuContainer = styled.ul`
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  position: absolute;
  right: 0;
  top: 45px;

  text-decoration: none;

  z-index: 100;
`;

export const MenuItem = styled.li`
  margin: 0 15px;
  padding: 10px 0;
  list-style-type: none;
  min-width: 80px;
  cursor: pointer;
`;

export const PostSaveStatus = styled.div`
  margin-right: 10px;

  h5 {
    color: var(--subtitles);
  }
`;
