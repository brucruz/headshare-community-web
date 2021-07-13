import { animated } from 'react-spring';
import styled from 'styled-components';

export const ModalContainer = styled(animated.div)`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  padding-top: 15px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 50px;
  margin-right: -50%;
  min-width: 100px;
  max-width: 600px;
  min-height: 100px;
  width: 90%;
  border-radius: 8px;
  border: none;
  transform: translate(-50%, -50%);
  background-color: var(--page-background);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  color: var(--gray-text);
  max-height: 90%;
  overflow: scroll;
  /* left: 100%;
  margin-right: 0%;
  opacity: 0;
  left: 50%;
  margin-right: -50%;
  opacity: 1;
  
  left: 0px;
  margin-right: 100%;
  opacity: 0; */
`;

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 999;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
`;

export const ModalTitle = styled.h2`
  color: var(--main-titles);
  padding-bottom: 15px;
`;

export const ModalSubitle = styled.p`
  color: var(--subtitles);
  padding-bottom: 15px;
`;

export const ModalMainButton = styled.div`
  margin-top: 10px;
`;
