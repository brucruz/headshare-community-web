import styled from 'styled-components';

export const PaymentForm = styled.form`
  padding-bottom: 15px;
`;

export const PaymentInputGroupWrapper = styled.div`
  padding-bottom: 15px;

  & > p {
    padding-bottom: 15px;
  }
`;

export const PaymentInputWrapper = styled.div`
  padding: 10px 0;
`;

export const PaymentInputWrapperSameLine = styled.div`
  display: flex;

  & > section + section {
    margin-left: 10px;
  }

  & > section {
    flex: 1 0 auto;
    width: 50%;
  }

  & > section + div {
    margin-left: 10px;
  }

  & > div {
    flex: 1 0 auto;
    width: 50%;

    display: flex;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;

      color: var(--subtitles);
    }
  }
`;

export const PaymentRadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
