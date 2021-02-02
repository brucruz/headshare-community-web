import styled from 'styled-components';

export const RegisterForm = styled.form`
  max-width: 600px;
  margin: 30px auto;

  display: flex;
  flex-direction: column;

  > div {
    > div {
      border: 1px solid rgba(38, 50, 56, 0.16);
      border-radius: 8px;
    }

    & + div {
      margin-top: 15px;
    }

    label {
      color: #363636;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 0.2px;
    }

    input {
      font-size: 14px;
      line-height: 19px;
      /* or 134% */

      display: flex;
      align-items: center;
      letter-spacing: 0.2px;

      /* input placeholder */

      color: #737373;
    }
  }

  button {
    margin-top: 30px;
  }
`;
