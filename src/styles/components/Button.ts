import styled, { css } from 'styled-components';

interface ButtonProps {
  priority: 'primary' | 'secondary' | 'tertiary';
  stretch?: boolean;
  size: 'medium' | 'small';
  isLoading?: boolean;
}

export const ButtonContainer = styled.button<ButtonProps>`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 19px;
  font-weight: 600;
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}

  ${props =>
    props.stretch &&
    css`
      width: 100%;
    `}

  h4 {
    margin: 8px 18px;
    font-weight: 600;
  }

  p {
    margin: 3px 10px;
  }

  ${props =>
    props.priority === 'primary' &&
    css`
      background-color: #e74f4f;
      color: #fafafa;
    `}

  ${props =>
    props.priority === 'secondary' &&
    css`
      border: 2px solid #e74f4f;
      color: #e74f4f;
    `}

  ${props =>
    props.priority === 'tertiary' &&
    css`
      background-color: #e3e3e3;
      color: #363636;
    `}

  ${props =>
    props.size === 'small' &&
    css`
      height: 35px;
      border-radius: 17.5px;
    `}

  ${props =>
    !props.disabled &&
    css`
      &:hover {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        opacity: 0.9;
      }
    `}

  ${props =>
    props.isLoading &&
    css`
      cursor: auto;

      &:hover {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        opacity: 0.9;
      }
    `}
`;
