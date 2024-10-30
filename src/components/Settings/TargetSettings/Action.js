import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles/Action.css"

function Action({ columnName, item, index }) {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`action-item ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {`${columnName === "Scripts" ? `${index + 1}.` : ""} ${
            item.content
          }`}
        </div>
      )}
    </Draggable>
  );
}
export default Action;
