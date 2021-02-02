import styled, { css } from 'styled-components';

interface PublishOptionStyleProps {
  isActive: boolean;
}

export const PublishOptionContainer = styled.div``;

export const PublishOptionButton = styled.button<PublishOptionStyleProps>`
  height: 50px;
  background: var(--gray-background);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid var(--gray-background);

  width: 100%;
  text-align: left;

  outline: none;
  transition: 0.4s;

  svg {
    height: 26px;
    width: 26px;

    color: var(--headshare-coral);
  }

  ${props =>
    props.isActive &&
    css`
      border-top: 1px solid var(--headshare-coral);
      border-left: 1px solid var(--headshare-coral);
      border-right: 1px solid var(--headshare-coral);

      border-radius: 8px 8px 0 0;
    `}
`;

export const PublishOptionHeader = styled.div`
  display: flex;
  align-items: center;

  h4 {
    color: var(--main-titles);
  }
`;

export const PublishOptionNumber = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 15px;

  background-color: var(--headshare-coral);

  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    color: var(--gray-background);
  }
`;

export const PublishOptionPanel = styled.div<PublishOptionStyleProps>`
  padding: 15px 15px 30px 15px;

  display: none;

  border-radius: 0 0 8px 8px;

  transition: 0.4s;

  ${props =>
    props.isActive &&
    css`
      display: block;

      border-bottom: 1px solid var(--headshare-coral);
      border-left: 1px solid var(--headshare-coral);
      border-right: 1px solid var(--headshare-coral);
    `}
`;
