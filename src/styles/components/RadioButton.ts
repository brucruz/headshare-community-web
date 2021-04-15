import styled, { css } from 'styled-components';

interface RadioButtonLabelProps {
  checked?: boolean;
  position: 'first' | 'middle' | 'last';
  stretch?: boolean;
}

export const RadioButtonLabel = styled.label<RadioButtonLabelProps>`
  display: block;
  width: fit-content;
  display: flex;
  cursor: pointer;
  flex-direction: row-reverse;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  padding: 10px;
  min-width: 80px;
  border: 1px solid black;
  ${props =>
    props.stretch &&
    css`
      width: 100%;
    `}

  border-radius: ${props => {
    switch (props.position) {
      case 'first':
        return '8px 0px 0px 8px';

      case 'last':
        return '0px 8px 8px 0px';

      default:
        return '0px';
    }
  }};

  background-color: ${props =>
    props.checked ? 'var(--headshare-coral)' : 'transparent'};
  color: ${props =>
    props.checked ? 'var(--page-background)' : 'var(--headshare-coral)'};
  border-color: var(--headshare-coral);

  &:hover {
    background-color: ${props =>
      props.checked ? 'var(--headshare-coral-80)' : 'transparent'};
    color: ${props =>
      props.checked ? 'var(--page-background)' : 'var(--headshare-coral-80)'};
    border-color: var(--headshare-coral-80);
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  p {
    font-weight: 600;
    text-align: center;
    width: 100%;
  }
`;

export const RadioButtonGroupContainer = styled.div`
  display: flex;

  border-radius: 8px;
`;
