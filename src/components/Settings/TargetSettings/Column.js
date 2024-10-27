import React from "react";
import Action from "./Action";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, actions, placeholderProps }) {
  console.log("🖥️  placeholderProps: ", placeholderProps);
  console.log("🖥️  actions: ", actions);

  const grid = 8;
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
    position: "relative"
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
            <div
              style={{
                position: "absolute",
                borderRadius: "10px",
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                width: placeholderProps.clientWidth,
                background: "tomato",
              }}
            />
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
