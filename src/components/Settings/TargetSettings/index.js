import React, { useState, useEffect } from "react";
import initialData from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import "./DragandDrop.css";
import "./TargetSettings.css";
import { v4 as uuidv4 } from "uuid";

function TargetsSettings() {
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [columns, setColumns] = useState(initialData.columns);

  const createPlaceHolder = (result, position) => {
    console.log("🖥️  result: ", result);
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    const draggableId = result.draggableId;
    console.log("🖥️  draggableId : ", draggableId);

    // Access the source column and find the dragged item
    console.log("fgdfg ===> ", result.source.droppableId);
    const sourceColumnId = result.source.droppableId;
    const sourceColumn = columns[sourceColumnId]; // Get the source column
    const itemIndex = result[position].index;
    const draggedItem = sourceColumn.items.find(
      (item) => item.id === draggableId
    ); // Get the dragged item

    console.log("🖥️  sourceColumn : ", sourceColumn);
    let placeholderText;
    
    if (sourceColumnId === "scriptsColumn") {
      console.log("it does")
      placeholderText = `${itemIndex + 1}. ${draggedItem.content}`;
    } else {
      console.log("it does...not")
      placeholderText = draggedItem.content;
    }
    console.log("🖥️  placeholderText: ", placeholderText);

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, itemIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      display: "flex",
      sourceColumnId,
      placeholderText,
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const handleDragStart = (result) => {
    if (!result.source) {
      return;
    }
    createPlaceHolder(result, "source");
  };

  const handleDragUpdate = (result) => {
    if (!result.destination) {
      return;
    }
    createPlaceHolder(result, "destination");
  };

  const handleDragEnd = (result) => {
    setPlaceholderProps({});
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
    if (
      sourceColumn.id === "actionsColumn" &&
      destinationColumn.id === "scriptsColumn"
    ) {
      const draggedItem = sourceColumn.items[source.index]; // Get the item being dragged

      // Create a new item with a unique ID for the "Scripts" column
      const newScriptItem = {
        ...draggedItem,
        id: uuidv4(), // Generate a unique ID for the item in the "Scripts" column
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
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragUpdate={handleDragUpdate}
      onDragStart={handleDragStart}
    >
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="drag-drop-container"
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <Column
              key={columnId}
              column={column}
              actions={column.items}
              placeholderProps={placeholderProps}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default TargetsSettings;
