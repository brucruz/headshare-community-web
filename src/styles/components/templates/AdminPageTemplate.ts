import styled from 'styled-components';
import device from '../../../utils/devices';

export const ContentContainer = styled.section`
  max-width: 1080px;
  margin: 0 auto;

  display: flex;

  padding-top: 20px;
  padding-bottom: 40px;

  padding-left: 12px;
  padding-right: 12px;

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

  h1 {
    width: 100%;
    margin-bottom: 30px;
  }
`;

export const AdminTopButton = styled.div`
  margin-bottom: 30px;
`;
