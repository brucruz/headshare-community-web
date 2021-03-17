import styled from 'styled-components';
import device from '../../utils/devices';

export const ContentSection = styled.section`
  width: 100vw;
  padding-top: 56px;

  @media ${device.laptop} {
    padding-top: 76px;
  }
`;

export const SideMenuContainer = styled.aside`
  display: none;

  @media ${device.laptop} {
    display: block;

    width: 300px;
    background-color: var(--page-background);

    left: 0;
    position: fixed;

    padding: 30px 0 10px 0;
  }
`;
