import React, { useState, useEffect } from "react";
import initialData from "./initialData";
import Column from "./Column"
import { DragDropContext } from "react-beautiful-dnd";
import "./DragandDrop.css"
import "./TargetSettings.css"


function TargetsSettings() {

  const [list, setList] = useState(initialData);
  console.log("🖥️  list: ", list);

  // const handleDragStart = () => {
  //   document.body.style.color = "orange"
  // };

  const handleDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(list.actions).length
      : 0;
    document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
  };

  const handleDragEnd = (result) => {
    document.body.style.color = "inherit"
    document.body.style.backgroundColor = "inherit"

    const { destination, source, draggableId } = result;

    // If there is no destination (the action was dropped outside a droppable area)
    if (!destination) {
      return;
    }

    // If the action is dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the column where the drag started
    const startColumn = list.columns[source.droppableId];
    const finishColumn = list.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.actionIds);
      newTaskIds.splice(source.index, 1); // Remove the action from the original index
      newTaskIds.splice(destination.index, 0, draggableId); // Insert the action at the new index

      const newColumn = {
        ...startColumn,
        actionIds: newTaskIds,
      };

      const newList = {
        ...list,
        columns: {
          ...list.columns,
          [newColumn.id]: newColumn,
        },
      };

      setList(newList);
      return;
    }

    // Moving between different columns (if you have more than one column)
    const startTaskIds = Array.from(startColumn.actionIds);
    console.log("🖥️  startTaskIds: ", startTaskIds)
    startTaskIds.splice(source.index, 1);
    console.log("🖥️  startTaskIds spliced: ", startTaskIds)

    const newStartColumn = {
      ...startColumn,
      // actionIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.actionIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      actionIds: finishTaskIds,
    };

    const newList = {
      ...list,
      columns: {
        ...list.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    setList(newList);
  };

  return (
    <DragDropContext
      // onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragUpdate={handleDragUpdate}
      
    >
      <div className="drag-drop-container">
      {list.columnOrder.map((columnId) => {
        const column = list.columns[columnId];
        const actions = column.actionIds.map((actionId) => list.actions[actionId]);
        return <Column key={column.id} column={column} actions={actions}></Column>;
      })}
      </div>
    </DragDropContext>
  );
}

export default TargetsSettings;
