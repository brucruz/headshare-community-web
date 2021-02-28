import styled from 'styled-components';

export const VideoContainer = styled.div`
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 169px);
  /* min-height: 480px; */

  background-color: black;
`;

export const PostContainer = styled.main`
  max-width: 940px;

  margin: 0 auto;

  margin-top: 30px;
`;

export const PostDateLikeComments = styled.div`
  margin-top: 16px;
  margin-left: 57px;
  margin-right: 12px;

  display: flex;
  justify-content: space-between;
`;

export const PostContentContainer = styled.div`
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 20px;
  margin-bottom: 30px;

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

export const MainMediaImage = styled.div`
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
`;
