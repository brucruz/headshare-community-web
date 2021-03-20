import styled from 'styled-components';

export const ConfigMainFormTitle = styled.section`
  padding-bottom: 35px;

  h1 {
    color: var(--main-titles);
  }

  p {
    color: var(--subtitles);
    padding-top: 5px;
  }
`;

export const ConfigMainForm = styled.form``;

export const ConfigMainInputWrapper = styled.div`
  & + div {
    margin-top: 40px;
  }
`;
