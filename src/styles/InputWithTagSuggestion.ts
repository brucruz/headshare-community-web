import styled from 'styled-components';

export const InputTagSuggestionContainer = styled.div`
  position: relative;
`;

export const TagsSuggestions = styled.ul`
  list-style: none;
  /* position: absolute;
  top: 43px; */

  background-color: var(--page-background);
  width: 100%;

  border: var(--input-border);
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  border-top-width: 2px;

  li {
    padding: 6px 12px;
    display: block;
    margin: 0;
    font-weight: 400;
    cursor: pointer;

    p {
      margin: 0;
      font-weight: 400;
    }

    &:hover {
      background-color: var(--card-background);

      p {
        font-weight: 500;
      }
    }

    & + li {
      border-top: var(--input-border);
    }
  }
`;

export const TagsSelection = styled.div`
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
