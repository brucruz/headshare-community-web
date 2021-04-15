import styled from 'styled-components';

export const FeaturesModalContainer = styled.main`
  h2 {
    color: var(--main-titles);
    padding-bottom: 15px;
  }
`;

export const FeaturesPlanSelectionContainer = styled.section``;

export const FeaturesListContainer = styled.ul`
  margin: 15px 0;
  list-style: none;

  li {
    & + li {
      margin-top: 15px;
    }
  }
`;
