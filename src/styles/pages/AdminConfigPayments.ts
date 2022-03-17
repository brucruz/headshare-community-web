import styled from 'styled-components';
import device from '../../utils/devices';

export const AdminConfigPaymentsContainer = styled.main``;

export const ConfigPaymentsTitle = styled.section`
  padding-bottom: 35px;

  h2 {
    color: var(--main-titles);
  }

  p {
    color: var(--subtitles);
    padding-top: 5px;
  }
`;

export const PaymentProviderConnectCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;

  width: 100%;

  display: flex;

  padding: 12px;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 3px;
    border-radius: 8px;
    border: var(--input-border);

    width: 40px;
    height: 40px;

    @media ${device.mobileM} {
      padding: 6px;
      width: 60px;
      height: 60px;
    }

    flex: 0 0 auto;
  }

  div:nth-child(2) {
    flex: 1 1 auto;
  }

  div:last-child {
    flex: 0 0 auto;
    display: flex;

    align-items: center;
    justify-content: center;
  }

  & > div + div {
    margin: 0 12px;
  }
`;
