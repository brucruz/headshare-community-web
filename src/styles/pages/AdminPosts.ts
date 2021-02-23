import styled from 'styled-components';

export const AdminPostList = styled.section`
  width: 100%;
`;

export const AdminPost = styled.article`
  & + article {
    margin-top: 30px;
  }
`;
