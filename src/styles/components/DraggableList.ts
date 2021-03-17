import styled, { css } from 'styled-components';

interface DraggableItemContainerProps {
  isDragging: boolean;
}

export const DraggableItemContainer = styled.article<DraggableItemContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 10px;
  border-radius: 8px;

  &:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  }

  &:hover .draggable-icons {
    opacity: 1;
  }

  ${props =>
    props.isDragging &&
    css`
      background-color: var(--success-fade);

      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);

      .draggable-icons {
        opacity: 1;
      }
    `}
`;

export const DraggableItemIcons = styled.div`
  opacity: 0;

  flex: 0 0 auto;
  display: flex;

  margin: 0 5px;
  margin-right: 0;
`;

export const DragIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border-radius: 8px;

  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: var(--subtitles);
  }

  &:hover {
    background-color: var(--gray-background);
  }
`;

export const DraggableItemTexts = styled.div`
  flex: 1 0 auto;

  h5 {
    margin-top: 5px;
  }
`;

interface DraggableItemContainerProps {
  isDragging: boolean;
}

interface DraggableListContainerProps {
  isDraggingOver: boolean;
}

export const DraggableListContainer = styled.section<DraggableListContainerProps>`
  width: 100%;

  transition: background-color 0.2s ease;
  border-radius: 8px;

  ${props =>
    props.isDraggingOver &&
    css`
      border: 1px dashed var(--gray-background);
      background-color: var(--light-gray-background);
    `};
`;
