import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { MdDelete } from 'react-icons/md';
import {
  DraggableItemContainer,
  DraggableItemIcons,
  DraggableItemTexts,
  DraggableListContainer,
  DragIconContainer,
} from '../styles/components/DraggableList';

export interface DraggableItemProps {
  text: {
    primary: string;
    secondary?: string;
  };
  id: string;
  index: number;
}

interface DraggableListProps {
  draggableItems: DraggableItemProps[];
  setDraggableItems: (items: DraggableItemProps[]) => void;
}

type CompleteDraggableItemProps = DraggableItemProps & {
  removeItem: (itemId: string) => void;
};

function DraggableItem({
  text,
  id,
  index,
  removeItem,
}: CompleteDraggableItemProps): JSX.Element {
  function handleRemoveItem(itemId: string): void {
    removeItem(itemId);
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <DraggableItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <DraggableItemTexts>
            <p>{text.primary}</p>

            {text.secondary && <h5>{text.secondary}</h5>}
          </DraggableItemTexts>

          <DraggableItemIcons className="draggable-icons">
            <DragIconContainer onClick={() => handleRemoveItem(id)}>
              <MdDelete />
            </DragIconContainer>
          </DraggableItemIcons>
        </DraggableItemContainer>
      )}
    </Draggable>
  );
}

export function DraggableList({
  draggableItems,
  setDraggableItems,
}: DraggableListProps): JSX.Element {
  function handleDragEnd(result: DropResult): void {
    const { destination, source, draggableId } = result;

    const draggable = draggableItems.find(item => item.id === draggableId);

    if (!draggable) {
      return;
    }

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const itemsList = draggableItems;
    const newItems = Array.from(itemsList);
    newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, draggable);

    const newDraggableItems = newItems.map(
      (item, index): DraggableItemProps => ({
        ...item,
        index,
      }),
    );

    setDraggableItems(newDraggableItems);
  }

  function handleRemoveItem(itemId: string): void {
    const newItems = draggableItems.filter(item => itemId !== item.id);

    const newDraggableItems = newItems.map(
      (item, index): DraggableItemProps => ({
        ...item,
        index,
      }),
    );

    setDraggableItems(newDraggableItems);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="draggable-list">
        {(provided, snapshot) => (
          <DraggableListContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {draggableItems.map((item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                text={{
                  primary: item.text.primary,
                  secondary: item.text.secondary,
                }}
                removeItem={handleRemoveItem}
              />
            ))}

            {provided.placeholder}
          </DraggableListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}
