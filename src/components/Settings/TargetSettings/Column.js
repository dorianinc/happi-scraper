import React from "react";
import Action from "./Action";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, actions }) {
  console.log("🖥️  actions: ", actions)
  return (
    <div className={`columns ${column.title}`}>
      <h3 className="column-title">{column.title}</h3>
      <Droppable droppableId={column.id} isDropDisabled={column.title === "Actions"}>
        {(provided, snapshot) => (
          <div
            className={`action-list ${column.title} ${
              snapshot.isDraggingOver ? "draggingOver" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
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
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
