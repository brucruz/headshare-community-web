import { createGlobalStyle } from 'styled-components';
import device from '../utils/devices';

export default createGlobalStyle`
  html {
    font-size: 14px;
    line-height: 1.339rem;
    letter-spacing: 0.2px;

    @media ${device.laptop} {
      font-size: 16px;
      line-height: 1.5rem;
      letter-spacing: 0.4px;
    }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {
    --page-background: #FAFAFA;
    --headshare-coral: #E74F4F;
    --headshare-coral-10: rgba(231, 79, 79, 0.1);

    --main-titles: #3E3E3E;
    --subtitles: #5A5A5A;
    --gray-text: #363636;

    --light-gray-background: #EEEEEE;
    --gray-background: #E3E3E3;
    --dark-gray-background: #CACACA;
    --card-background: #F5F5F5;

    --error-color: #BA3737;
    
    --success-color: #24A648;
    --success-fade: rgba(36, 166, 72, 0.2);

    --warning-color: #B98E0C;
    --warning-fade: rgba(242, 201, 76, 0.2);

    --draft-color: #2D9CDB;
    --draft-fade: rgba(45, 156, 219, 0.2);
    
    --input-placeholder: #737373;
    --input-border: 1px solid rgba(38, 50, 56, 0.16);

  }

  body {
  background: var(--page-background);
  color: var(--gray-text);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
  }

  h1 {
    font-weight: 800;
    font-size: 1.714rem;
    line-height: 2.571rem;
    color: var(--main-titles);

    /* @media ${device.laptop} {
      font-size: 3.656rem;
      line-height: 4.750rem;
    } */
  }

  h2 {
    font-weight: 800;
    font-size: 1.429rem;
    line-height: 2.143rem;
    color: var(--main-titles);

    /* @media ${device.laptop} {
      font-size: 2.369rem;
      line-height: 3.554rem;
    } */
  }

  h3 {
    font-weight: bold;
    font-size: 1.286rem;
    line-height: 1.857rem;
    color: var(--main-titles);

    /* @media ${device.laptop} {
      font-size: 1.777rem;
      line-height: 2.666rem;
    } */
  }

  h4 {
    font-weight: 600;
    font-size: 1.143rem;
    line-height: 1.571rem;

    /* @media ${device.laptop} {
      font-size: 1.333rem;
      line-height: 2rem;
    } */
  }

  h5 {
    font-weight: 600;
    font-size: 0.893rem;
    line-height: 1.214rem;
    letter-spacing: 0.4px;

    /* @media ${device.laptop} {
      font-size: 0.75rem;
      line-height: 1.125rem;
      letter-spacing: 1px; */
    /* } */
  }

  a {
  color: var(--gray-text);
  text-decoration: none;
  }

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
