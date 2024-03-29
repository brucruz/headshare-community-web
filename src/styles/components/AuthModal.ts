import styled from 'styled-components';

export const AuthModalContainer = styled.div``;

export const AuthHeaderContainer = styled.div`
  h2 {
    color: var(--main-titles);
  }
`;

export const AuthForm = styled.form`
  max-width: 600px;
  margin: 30px auto;
  margin-bottom: 0;

  display: flex;
  flex-direction: column;

  > section {
    header {
      div {
        label {
          top: -2px;
        }
      }
    }

    & + section {
      margin-top: 22px;
    }
  }

  button {
    margin-top: 30px;
    justify-content: center;
  }
`;

export const OtherAuthOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin-top: 10px;

  p {
    & + p {
      margin-top: 10px;
    }

    a {
      text-decoration: underline;
      color: var(--headshare-coral);
      cursor: pointer;

      &:hover {
        font-weight: 600;
      }
    }
  }
`;

export const MultiStepContainer = styled.div`
  h3 {
    margin-bottom: 20px;
  }

  section {
    & + section {
      margin-top: 28px;
    }
  }
`;
