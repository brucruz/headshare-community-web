import styled from 'styled-components';
import device from '../../../utils/devices';

export const ContentContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;

  display: flex;

  padding-bottom: 40px;

  padding-left: 12px;
  padding-right: 12px;

  background-color: var(--page-background);

  @media ${device.tablet} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const AdminSideMenu = styled.aside`
  display: none;

  margin-right: 50px;
  width: 250px;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

export const AdminMain = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdminMainUpperHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-end;

  padding-top: 20px;
  padding-bottom: 30px;
  background-color: var(--page-background);

  z-index: 10;
`;

export const AdminMainHeader = styled.header`
  width: 100%;

  position: sticky;
  top: 56px;

  background-color: var(--page-background);

  z-index: 10;

  @media ${device.laptop} {
    top: 76px;
  }
`;

export const AdminMainHeaderTitle = styled.div`
  width: 100%;
  flex: 1 1 auto;

  h5 {
    text-transform: uppercase;
    color: var(--subtitles);
  }
`;

export const AdminTopButton = styled.div`
  margin-left: 20px;

  flex: 0 0 auto;
`;
