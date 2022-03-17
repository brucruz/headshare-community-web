import styled, { css } from 'styled-components';

interface PaymentMethodStatus {
  active?: boolean;
  type?: 'list' | 'confirmation';
}

export const PaymentMethodCardContainer = styled.li<PaymentMethodStatus>`
  list-style: none;
  border-radius: 8px;
  background-color: ${props =>
    props.active ? 'var(--success-color)' : 'white'};

  color: ${props => (props.active ? 'white' : 'var(--success-color)')};

  display: flex;
  align-items: center;

  padding: 11px 12px;

  ${props =>
    props.type === 'list' &&
    props.active &&
    css`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `}

  ${props =>
    props.type === 'list' &&
    !props.active &&
    css`
      cursor: pointer;

      &:hover {
        background-color: var(--card-background);
        /* opacity: 0.8; */
      }
    `}

  & + li {
    margin-top: 12px;
  }
`;

export const PaymentMethodDetails = styled.div`
  margin-left: 12px;
  flex: 1 0 auto;
`;

export const PaymentCardNumber = styled.div<PaymentMethodStatus>`
  display: flex;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    letter-spacing: 0.2px;

    color: ${props => (props.active ? 'white' : 'var(--gray-text)')};
  }

  & > div {
    margin: 0 8px;
    display: flex;
    align-items: center;

    & > div {
      width: 4px;
      height: 4px;
      background-color: ${props =>
        props.active ? 'white' : 'var(--gray-text)'};
      border-radius: 50%;

      & + div {
        margin-left: 4px;
      }
    }
  }
`;

export const PaymentCardHolder = styled.div<PaymentMethodStatus>`
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;

  letter-spacing: 0.4px;
  color: ${props => (props.active ? 'white' : 'var(--gray-text)')};
`;

export const PaymentMethodAction = styled.button<PaymentMethodStatus>`
  span {
    font-weight: 500;
    font-size: 12.5px;
    line-height: 17px;

    color: ${props => (props.active ? 'white' : 'var(--success-color)')};
  }

  svg {
    color: ${props => (props.active ? 'white' : 'var(--success-color)')};
  }

  :hover {
    opacity: 0.8;
  }
`;
