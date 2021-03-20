import styled from 'styled-components';
import device from '../../utils/devices';

export const FooterContainer = styled.footer`
  padding-top: 40px;
  padding-bottom: 40px;

  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 40px;

  text-align: center;

  /* display: flex;
  flex-direction: column;
  align-items: center; */
  margin: 0 auto;
  max-width: 800px;
`;

export const LegalContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  p {
    a {
      color: #363636;
    }

    & + p {
      margin-top: 10px;
    }
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 20px;

    @media ${device.mobileS} {
      h4 {
        font-size: 14px;
      }
    }
  }
`;

export const PublishButton = styled.button`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 19px;

  margin: 0 auto;

  p {
    margin: 3px 10px;
  }

  background-color: #e3e3e3;
  color: #363636;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    opacity: 0.9;
  }
`;

export const ImageWrapper = styled.div`
  height: 28px;
  margin: 3px 10px;
`;
