import styled from 'styled-components';

export const AdminCategoryList = styled.section`
  width: 100%;
`;

export const AdminCategory = styled.article`
  & + article {
    margin-top: 30px;
  }
`;

export const CategoryCardContainer = styled.article`
  border-radius: 8px;
  background-color: var(--card-background);
`;

export const CategoryCardHeader = styled.header`
  background-color: var(--light-gray-background);
  border-radius: 8px 8px 0 0;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding: 15px 12px 10px 12px;
`;

export const CategoryTitleAndPosts = styled.div`
  h4 {
    color: var(--gray-text);
    margin-bottom: 5px;
  }

  h5 {
    color: var(--subtitles);
  }
`;

export const CategoryCardDescription = styled.section`
  margin: 0 12px;
  padding: 15px 0;

  border-bottom: var(--input-border);

  h5 {
    color: var(--main-titles);
    margin-bottom: 5px;
  }

  p {
    color: var(--gray-text);
  }
`;

export const CategoryCardLink = styled.section`
  margin: 0 12px;
  padding: 15px 0;

  h5 {
    color: var(--main-titles);
    margin-bottom: 5px;
  }

  p {
    color: var(--gray-text);
  }
`;

export const EditCategoryModalContainer = styled.div``;

export const EditCategoryHeaderContainer = styled.div`
  h2 {
    color: var(--main-titles);
  }
`;

export const EditCategoryForm = styled.form`
  max-width: 600px;
  margin: 30px auto;
  margin-bottom: 0;

  display: flex;
  flex-direction: column;

  > section {
    header {
      div {
        label {
          top: -2px;
        }
      }
    }

    & + section {
      margin-top: 22px;
    }
  }

  button {
    margin-top: 30px;
    justify-content: center;
  }
`;
