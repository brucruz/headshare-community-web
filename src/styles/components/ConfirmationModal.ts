import styled from 'styled-components';

export const InnerContainer = styled.section`
  text-align: center;

  h5 {
    color: var(--error-color);
  }
`;

export const ConfirmationModalText = styled.div`
  h3 {
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 15px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 10px;

  button + button {
    margin-left: 10px;
  }
`;
