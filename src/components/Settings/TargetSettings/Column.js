import React from "react";
import Action from "./Action";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, actions, placeholderProps }) {
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
    position: "relative",
  });

  return (
    <div className={`columns ${column.title}`}>
      <h3 className="column-title">{column.title}</h3>
      <Droppable
        droppableId={column.id}
        isDropDisabled={column.title === "Actions"}
      >
        {(provided, snapshot) => (
          <div
            className={`action-list ${column.title} ${
              snapshot.isDraggingOver ? "draggingOver" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {actions.map((action, i) => (
              <Action
                key={action.id}
                columnName={column.title}
                action={action}
                index={i}
              />
            ))}
            {provided.placeholder}

            {/* Conditional rendering of the placeholder */}
            {placeholderProps.sourceColumnId === column.id && (
              <div
                className="action-item"
                style={{
                  display: placeholderProps.display
                    ? placeholderProps.display
                    : "none",
                  position: "absolute",
                  borderRadius: "10px",
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                  background: "#f9f9f9",
                  opacity: "0.33",
                }}
              >
                {placeholderProps.placeholderText}
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
