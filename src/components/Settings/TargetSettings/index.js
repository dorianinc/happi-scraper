import React, { useState, useEffect } from "react";
import initialData from "./initialData";
import Column from "./Column"
import { DragDropContext } from "react-beautiful-dnd";
import "./DragandDrop.css"
import "./TargetSettings.css"
import { v4 as uuidv4 } from 'uuid'; 


function TargetsSettings() {
  const [columns, setColumns] = useState(initialData.columns);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same column at the same index, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    // If dragging from "Actions" to "Scripts"
    if (sourceColumn.id === "actionsColumn" && destinationColumn.id === "scriptsColumn") {
      const draggedItem = sourceColumn.items[source.index]; // Get the item being dragged

      // Create a new item with a unique ID for the "Scripts" column
      const newScriptItem = {
        ...draggedItem,
        id: uuidv4(),  // Generate a unique ID for the item in the "Scripts" column
      };

      // Add the new item to the "Scripts" column
      const newScriptsItems = Array.from(destinationColumn.items);
      newScriptsItems.splice(destination.index, 0, newScriptItem);

      setColumns({
        ...columns,
        scriptsColumn: {
          ...destinationColumn,
          items: newScriptsItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="drag-drop-container"
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return <Column key={columnId} column={column} actions={column.items} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default TargetsSettings;
