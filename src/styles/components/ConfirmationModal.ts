import styled from 'styled-components';

export const InnerContainer = styled.section`
  margin: 15px;
  text-align: center;
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

  margin: 10px auto;

  button + button {
    margin-left: 10px;
  }
`;
