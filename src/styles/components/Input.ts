import styled from 'styled-components';

export const InputContainer = styled.section`
  position: relative;
`;

export const UserInput = styled.header`
  background: var(--page-background);
  width: 100%;
  height: 48px;

  display: flex;

  border: var(--input-border);
  border-radius: 6px;

  padding: 0 12px;

  margin-top: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    line-height: 20px;
    color: #3c4759;

    position: absolute;
    top: -10px;
    left: 10px;
    background-color: var(--page-background);
    padding: 0px 4px;
  }

  input {
    border: 0;
    margin: auto 0;

    ::placeholder {
      color: var(placeholder-color);
    }
  }
`;

export const InputTextArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;
