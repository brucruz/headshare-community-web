import styled from 'styled-components';

interface TextAreaProps {
  hasError: boolean;
}

export const TextAreaContainer = styled.section`
  position: relative;
`;

export const UserTextArea = styled.header<TextAreaProps>`
  background: var(--page-background);
  width: 100%;
  min-height: 140px;

  display: flex;

  border: var(--input-border);

  ${props => props.hasError && { borderColor: 'var(--error-color)' }};
  border-radius: 6px;

  padding: 0 12px;

  margin-top: 8px;

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

  textarea {
    border: 0;
    margin: auto 0;

    height: 120px;
    background-color: var(--page-background);
    resize: vertical;

    ::placeholder {
      color: var(placeholder-color);
    }
  }
`;

export const TextAreaArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

export const TextAreaError = styled.div`
  position: absolute;

  bottom: -17px;
  left: 12px;

  h5 {
    color: var(--error-color);
  }
`;

export const TextAreaMaxLength = styled.div`
  position: absolute;

  bottom: -20px;
  right: 0px;

  h5 {
    color: var(--input-placeholder);
  }
`;
