import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Action({ columnName, action, index }) {

  return (
    <Draggable draggableId={action.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`action-container ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {`${columnName === "Script" ? `${index + 1}.` : ""} ${action.content}`}
        </div>
      )}
    </Draggable>
  );
}

export default Action;
