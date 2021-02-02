import styled, { css } from 'styled-components';

interface SwitchProps {
  isOn: boolean;
}

export const Container = styled.article`
  display: flex;
`;

export const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + label {
    span {
      left: calc(100% - 0.1rem);
      transform: translateX(-100%);
    }
  }
`;

export const SwitchLabel = styled.label<SwitchProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 3rem;
  height: 1.5rem;
  background: grey;
  border-radius: 3rem;
  position: relative;
  transition: background-color 0.2s;

  ${props =>
    props.isOn &&
    css`
      background: var(--headshare-coral);
    `}

  &:active {
    span {
      width: 1rem;
    }
  }
`;

export const SwitchButton = styled.span`
  content: '';
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 1.3rem;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(10, 10, 10, 0.29);
`;
