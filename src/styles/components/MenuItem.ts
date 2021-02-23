import styled, { css } from 'styled-components';

interface MenuItemContainerProps {
  selected: boolean;
}

export const MenuItemContainer = styled.li<MenuItemContainerProps>`
  list-style: none;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;

  color: var(--gray-text);

  cursor: pointer;

  &:hover {
    background-color: var(--light-gray-background);
  }

  ${props =>
    props.selected &&
    css`
      color: var(--headshare-coral);
      background-color: var(--headshare-coral-10);

      &:hover {
        background-color: var(--headshare-coral-10);
      }
    `}
`;
