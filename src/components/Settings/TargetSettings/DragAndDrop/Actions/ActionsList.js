import React, { useState } from "react";
import Action from "./Action";
import "./Actions.css";
import { Droppable } from "react-beautiful-dnd";

const ActionsList = () => {


  return (
    <div className="columns">
      <h3>Actions</h3>
      {/* <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className="draggables"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.actions.map((action, i) => (
              <Action key={action.id} action={action} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}
    </div>
  );
};

export default ActionsList;
