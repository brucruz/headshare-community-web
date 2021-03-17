import { animated } from 'react-spring';
import styled from 'styled-components';
import device from '../../utils/devices';

export const MenuContainerLi = styled.li`
  width: 30px;
  height: 30px;

  border-radius: 50%;

  list-style: none;

  position: relative;

  margin-left: 10px;

  @media ${device.laptop} {
    width: 40px;
    height: 40px;
  }
`;

export const MenuIcon = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const MenuListContainer = styled(animated.ul)`
  background: var(--page-background);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  min-width: 125px;

  position: absolute;
  right: 0;
  top: 45px;

  @media ${device.laptop} {
    top: 60px;
  }
`;

export const MenuHeaderContainer = styled.li`
  background-color: white;

  padding: 15px;

  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid var(--gray-background);

  list-style: none;

  h4 {
    font: var(--main-titles);
  }
`;

export const MenuGroupContainer = styled.ul`
  border-bottom: 1px solid var(--gray-background);
`;

export const MenuGroupTitle = styled.li`
  padding: 0 15px;
  padding-top: 8px;

  list-style: none;

  h5 {
    text-transform: uppercase;
    color: var(--subtitles);
    font-weight: 500;
    font-size: 11px;
  }
`;
