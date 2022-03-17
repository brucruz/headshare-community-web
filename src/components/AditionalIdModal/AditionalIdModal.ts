import styled from 'styled-components';

export const AditionalIdForm = styled.form``;

export const AditionalIdInputGroupWrapper = styled.div`
  padding-bottom: 15px;

  & > p {
    padding-bottom: 5px;
  }
`;

export const AditionalIdInputWrapper = styled.div`
  padding: 10px 0;
`;

export const AditionalIdInputWrapperSameLine = styled.div`
  display: flex;

  & > section + section {
    margin-left: 10px;
  }

  & > section:first-child {
    flex: 0 0 auto;

    max-width: 50px;
  }

  & > section:last-child {
    flex: 1 0 auto;
  }
`;

export const AditionalIdRadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
