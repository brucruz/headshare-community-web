import styled from 'styled-components';

export const Base = styled.label`
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

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    display: flex;
    padding: 4px;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: transparent;
    border: 2px solid var(--subtitles);
    box-sizing: border-box;
    border-radius: 50%;
  }

  .checkmark span {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }

  .shadow {
    display: flex;
    padding: 8px;

    background-color: transparent;

    border-radius: 50%;
  }

  &:hover .shadow {
    background-color: var(--subtitles-10);
  }

  &:hover input:checked ~ .shadow {
    background-color: var(--headshare-coral-10);
  }

  input:checked ~ .shadow .checkmark {
    border-color: var(--headshare-coral);
  }

  input:checked ~ .shadow .checkmark span {
    background: var(--headshare-coral);
  }
`;

interface TextContainerProps {
  isChecked?: boolean;
}

export const TextContainer = styled.div<TextContainerProps>`
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  span {
    /* color: var(--subtitles); */
    color: ${props =>
      props.isChecked ? 'var(--headshare-coral)' : 'var(--subtitles)'};
  }

  span:nth-child(2) {
    font-size: 12px;
  }
`;
