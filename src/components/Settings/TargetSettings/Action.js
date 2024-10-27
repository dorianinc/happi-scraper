import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Action({ columnName, action, index }) {
  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  return (
    <Draggable draggableId={action.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`action-item ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {`${columnName === "Scripts" ? `${index + 1}.` : ""} ${
            action.content
          }`}
        </div>
      )}
    </Draggable>
  );
}
export default Action;