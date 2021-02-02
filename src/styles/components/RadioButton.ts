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

  span.text {
    /* color: #3c4759; */
  }

  .checkmark {
    display: flex;
    padding: 5px;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: transparent;
    border: 1px solid #bcc3d4;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .checkmark span {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }

  input:checked ~ .checkmark span {
    background: var(--headshare-coral);
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  span:nth-child(2) {
    font-size: 12px;
  }
`;
