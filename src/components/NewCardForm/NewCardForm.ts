import styled from 'styled-components';

export const NewCardFormContainer = styled.form`
  padding-bottom: 15px;
`;

export const NewCardInputGroupWrapper = styled.div`
  padding-bottom: 15px;

  & > p {
    padding-bottom: 15px;
  }
`;

export const NewCardInputWrapper = styled.div`
  padding: 10px 0;
`;

export const NewCardInputWrapperSameLine = styled.div`
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

export const NewCardRadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
