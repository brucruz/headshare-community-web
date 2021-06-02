import styled from 'styled-components';
import device from '../../utils/devices';

export const ContentWrapperArea = styled.main`
  display: flex;
  justify-content: center;

  margin: 25px 12px;

  width: calc(100% - 24px);
`;

export const ContentArea = styled.main`
  width: 100%;
  max-width: 1400px;

  @media ${device.laptop} {
    display: flex;
    justify-content: center;
  }
`;

export const PublishOptions = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  display: block;
  width: 100%;
  max-width: 400px;

  div + div {
    margin-top: 15px;
  }

  @media ${device.laptop} {
    margin-top: 0;
  }
`;

export const PublishOptionInput = styled.div`
  p {
    display: block;
    margin-bottom: 12px;

    font-weight: 600;
  }

  & + div {
    margin-top: 15px;
  }
`;

export const PublishOptionSwitch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PublishButton = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const ConfirmationModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: var(--main-titles);
    width: 100%;
  }

  p {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  button:last-child {
    cursor: pointer;
    text-decoration: underline;
    margin-top: 10px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const VideoThumbnailContainer = styled.div`
  margin-top: 15px;
`;

export const VideoThumbnailPreview = styled.div`
  width: 100%;

  img {
    height: 84px;
  }
`;
