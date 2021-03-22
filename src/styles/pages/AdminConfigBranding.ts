import styled from 'styled-components';

export const AdminConfigBrandingContainer = styled.main``;

export const ConfigBrandingTitle = styled.section`
  padding-bottom: 35px;

  h2 {
    color: var(--main-titles);
  }

  p {
    color: var(--subtitles);
    padding-top: 5px;
  }
`;

export const ConfigBrandingInputWrapper = styled.div`
  & + div {
    margin-top: 40px;
  }
`;
