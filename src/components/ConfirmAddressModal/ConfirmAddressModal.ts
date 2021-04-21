import styled from 'styled-components';
import device from '../../utils/devices';

export const ConfirmAddressForm = styled.form``;

export const ConfirmAddressInputGroupWrapper = styled.div`
  padding-bottom: 15px;
`;

export const ConfirmAddressInputWrapper = styled.div`
  padding: 8px 0;
`;

export const ConfirmAddressInputWrapperSameLine = styled.div`
  display: flex;
  padding: 13px 0 8px 0;

  & > section + section {
    margin-left: 10px;
  }

  & > section {
    flex: 1 0 auto;
  }

  @media ${device.mobileS} {
    flex-direction: column;

    & > section + section {
      margin-top: 16px;
      margin-left: 0px;
    }
  }
`;
