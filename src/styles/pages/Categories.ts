import styled from 'styled-components';

export const CategoriesContainer = styled.main`
  margin-top: 15px;
  margin-bottom: 20px;

  h4 {
    margin-left: 12px;
    margin-right: 12px;
    color: #3e3e3e;
  }
`;

export const CategoriesButtons = styled.ul`
  margin-top: 15px;
  width: 100%;
`;

export const CategoryButton = styled.li`
  list-style: none;
  display: flex;
  cursor: pointer;

  padding: 14px 12px;

  background-color: #ffffff;

  p {
    flex: 1 0 auto;
  }

  & + li {
    margin-top: 4px;
  }
`;
