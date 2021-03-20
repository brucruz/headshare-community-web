import { animated } from 'react-spring';
import styled from 'styled-components';

export const SnackbarWrapper = styled(animated.div)`
  background-color: #323232;
  color: var(--page-background);

  padding: 24px 20px;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: 20px;

    h4 {
      color: var(--warning-color);
      text-transform: uppercase;
    }
  }

  & + div {
    margin-top: 8px;
  }
`;
