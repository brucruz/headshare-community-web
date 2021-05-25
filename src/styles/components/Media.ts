import styled from 'styled-components';

export const MediaContainer = styled.section``;

export const VideoUploaded = styled.div`
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 169px);
  min-height: 320px;

  background-color: black;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  iframe {
    width: 100%;
    height: 100%;
  }

  &:hover > .main-media-options {
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const ImageUploaded = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  margin: 0 auto;
  max-width: 940px;
  height: auto;
  width: calc(100% - 24px);

  div {
    div {
      img {
        max-height: 600px;
        object-fit: contain;
      }
    }
  }

  &:hover > .main-media-options {
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const MediaOptions = styled.div`
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;

  right: calc(0%);
  top: calc(0%);
  width: 100%;
  height: 20%;
  max-height: 50px;
`;

export const OptionsContainer = styled.div`
  background-color: #fff;
  /* width: 120px; */

  display: flex;
`;
