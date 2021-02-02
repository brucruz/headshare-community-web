import styled from 'styled-components';

export const PostBuilderWrapper = styled.section`
  /* margin: 25px 12px; */
  width: 100%;

  #title-editor::before {
    font-size: 1.714rem;
    line-height: 2.571rem;
  }
  #title-editor {
    margin-bottom: 28px;
  }

  #content-editor::before {
    font-size: 18px;
    line-height: 28px;
  }

  h2,
  h3,
  h4 {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  p {
    font-size: 17px;
    line-height: 28px;
    margin-bottom: 20px;
  }

  td {
    padding: 8px 12px;

    h2,
    h3,
    h4,
    p + h2,
    h3,
    h4,
    p {
      margin-top: 0px;
      margin-bottom: 10px;
    }
  }

  blockquote {
    padding-left: 20px;
    border-left: 3px solid var(--subtitles);
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: var(--card-background);

    margin-bottom: 20px;
  }

  a {
    text-decoration-line: underline;
    color: var(--headshare-coral);
  }
`;

export const PostBuilderTitle = styled.h1`
  textarea {
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    letter-spacing: inherit;

    background-color: transparent;
  }
`;

export const PostBuilderSubtitle = styled.h2`
  textarea {
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    letter-spacing: inherit;

    background-color: transparent;
  }
`;
