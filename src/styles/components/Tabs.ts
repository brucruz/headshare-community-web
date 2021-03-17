import styled, { css } from 'styled-components';

interface TabContainerProps {
  active: boolean;
}

export const TabContainer = styled.article<TabContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  min-width: 120px;

  ${props =>
    props.active &&
    css`
      border-bottom: 2px solid var(--headshare-coral);
      color: var(--headshare-coral);
    `}

  ${props =>
    !props.active &&
    css`
      cursor: pointer;

      &:hover {
        background-color: var(--gray-background);
      }
    `}
`;

export const TabContent = styled.div`
  margin: 13px 22px;
`;

export const TabsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: baseline;
  width: 100%;

  margin-bottom: 30px;
`;
