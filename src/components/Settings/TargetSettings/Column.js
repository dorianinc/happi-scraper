import React from 'react';
import Action from './Action';
import { Droppable } from 'react-beautiful-dnd';

function Column({ column, actions }) {
  return (
    <div className={`columns ${column.name}`}>
      <h3 className="column-title">{column.name}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`action-list ${column.name} ${snapshot.isDraggingOver ? "draggingOver" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            // Apply the style only if the column name is "Actions"
  
          >
            {actions.map((action, i) => (
              <Action key={action.id} columnName={column.name} action={action} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
