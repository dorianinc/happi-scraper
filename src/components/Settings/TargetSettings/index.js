import React, { useState, useEffect } from "react";
import initialData from "./initialData";
import Column from "./Column"
import { DragDropContext } from "react-beautiful-dnd";
import "./DragandDrop.css"
import "./TargetSettings.css"
import { v4 as uuidv4 } from 'uuid'; 


function TargetsSettings() {
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [columns, setColumns] = useState(initialData.columns);


  const onDragUpdate = update => {
    if(!update.destination){
      return;
    }
    const queryAttr = "data-rbd-drag-handle-draggable-id";
		const draggableId = update.draggableId;
		const destinationIndex = update.destination.index;
		const domQuery = `[${queryAttr}='${draggableId}']`;
		const draggedDOM = document.querySelector(domQuery);

		if (!draggedDOM) {
			return;
		}
		const { clientHeight, clientWidth } = draggedDOM;

		const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
			.slice(0, destinationIndex)
			.reduce((total, curr) => {
				const style = curr.currentStyle || window.getComputedStyle(curr);
				const marginBottom = parseFloat(style.marginBottom);
				return total + curr.clientHeight + marginBottom;
			}, 0);

		setPlaceholderProps({
			clientHeight,
			clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
		});
	};

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
      setPlaceholderProps({})
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
    <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={onDragUpdate}>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="drag-drop-container"
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return <Column key={columnId} column={column} actions={column.items} placeholderProps={placeholderProps} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default TargetsSettings;
