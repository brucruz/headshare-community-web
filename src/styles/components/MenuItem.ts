import styled, { css } from 'styled-components';

interface MenuItemContainerProps {
  selected: boolean;
  disabled: boolean;
}

export const MenuItemContainer = styled.li<MenuItemContainerProps>`
  list-style: none;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;

  color: var(--gray-text);
  white-space: nowrap;

  cursor: pointer;

  &:hover {
    background-color: var(--light-gray-background);
  }

  ${props =>
    props.selected &&
    css`
      color: var(--headshare-coral);
      background-color: var(--headshare-coral-10);
      cursor: auto;

      border-left: 3px solid var(--headshare-coral);
      padding-left: 12px;

      &:hover {
        background-color: var(--headshare-coral-10);
      }
    `}

  ${props =>
    props.disabled &&
    css`
      color: var(--input-placeholder);
      cursor: auto;

      &:hover {
        color: var(--input-placeholder);
        background-color: transparent;
      }
    `}
`;
