import React from "react";
import Action from "./Action";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, actions, placeholderProps }) {
  const getListStyle = (isDraggingOver) => ({
    position: "relative",
  });

  const itemDisplay = placeholderProps.display
    ? placeholderProps.display
    : "none";
  const itemWidth =
    placeholderProps.sourceColumnId === "scriptsColumn"
      ? placeholderProps.clientWidth
      : "fit-content";

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
                  display: itemDisplay,
                  position: "absolute",
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  width: itemWidth,
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
