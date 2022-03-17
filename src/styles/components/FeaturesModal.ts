import { animated } from 'react-spring';
import styled from 'styled-components';

export const FeaturesModalContainer = styled(animated.main)`
  h2 {
    color: var(--main-titles);
    padding-bottom: 15px;
  }
`;

export const FeaturesPlanSelectionContainer = styled.section``;

export const FeaturesListContainer = styled.ul`
  margin-top: 15px;
  list-style: none;
`;

export const FeatureContainer = styled.li`
  display: flex;

  svg {
    color: var(--headshare-coral);

    flex: 0 0 auto;
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }

  & + li {
    margin-top: 15px;
  }

  &:hover {
    color: var(--subtitles);

    svg {
      color: var(--headshare-coral-80);
    }
  }
`;

export const MoreFeaturesButton = styled.button`
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  align-items: center;

  color: var(--headshare-coral);
  p {
    font-size: 14px;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-top: 2px;
  }

  &:hover {
    color: var(--headshare-coral-80);
  }
`;
