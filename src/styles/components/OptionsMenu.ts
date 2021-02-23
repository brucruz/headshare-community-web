import styled from 'styled-components';

export const OptionsMenuContainer = styled.div`
  position: relative;
`;

export const OptionsMenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12px;
  border-radius: 6px;

  padding: 0 4px;

  background-color: var(--gray-background);

  &:hover {
    background-color: var(--dark-gray-background);
  }
`;

export const OptionsMenuCircle = styled.div`
  margin: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;

  background-color: var(--subtitles);

  & + div {
    margin-left: 2px;
  }
`;

export const OptionsHoverMenu = styled.menu`
  position: absolute;
  right: 0;
  top: 20px;
  min-width: 120px;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
`;
