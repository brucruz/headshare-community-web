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
