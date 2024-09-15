import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Option({ option, index }) {

  return (
    <Draggable draggableId={option.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`option-container ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {`${index + 1}. ${option.content}`}
        </div>
      )}
    </Draggable>
  );
}

export default Option;
