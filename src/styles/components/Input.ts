import styled from 'styled-components';

interface InputProps {
  hasError: boolean;
}

export const InputContainer = styled.section`
  position: relative;
`;

export const UserInput = styled.header<InputProps>`
  background: var(--page-background);
  width: 100%;
  height: 48px;

  display: flex;

  border: var(--input-border);

  ${props => props.hasError && { borderColor: 'var(--error-color)' }};
  border-radius: 6px;

  padding: 0 12px;

  /* margin-top: 8px; */

  label {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    line-height: 20px;
    ${props =>
      props.hasError ? { color: 'var(--error-color)' } : { color: '#3c4759' }};

    position: absolute;
    top: -10px;
    left: 10px;
    background-color: var(--page-background);
    padding: 0px 4px;
  }

  input {
    border: 0;
    margin: auto 0;
    width: 100%;
    background-color: var(--page-background);

    ::placeholder {
      color: var(placeholder-color);
    }
  }
`;

export const InputTextArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  /* width: 100%; */
`;

export const InputCreditCardBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputError = styled.div`
  position: absolute;

  bottom: -17px;
  left: 12px;

  h5 {
    color: var(--error-color);
  }
`;

export const InputMaxLength = styled.div`
  position: absolute;

  bottom: -20px;
  right: 0px;

  h5 {
    color: var(--input-placeholder);
  }
`;
