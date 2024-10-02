import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Action({ action, index }) {
  return (
    <Draggable draggableId={action.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`option-container ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {`${index + 1}. ${action.content}`}
        </div>
      )}
    </Draggable>
  );
}

export default Action;
