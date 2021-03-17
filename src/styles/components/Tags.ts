import styled from 'styled-components';

export const TagsContainer = styled.div`
  display: block;
  padding-bottom: 2px;

  article {
    padding: 6px 6px;
    border-radius: 8px;
    background-color: var(--card-background);

    margin-bottom: 6px;
    margin-right: 6px;
    width: fit-content;

    display: flex;
    align-items: center;

    header {
      display: flex;
      align-items: center;

      h5 {
        font-weight: 400;
        width: fit-content;
      }
    }

    button {
      cursor: pointer;

      display: flex;
      align-items: center;

      svg {
        margin-left: 4px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
