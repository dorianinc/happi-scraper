import React, { useState } from "react";
import Column from "./Column";
import MovableItem from "./MovableItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import initialData from "./tasks";
import "./potato.css";

function TargetsSettings() {
  const [columns, setColumns] = useState(initialData.columns);

  const moveCardHandler = (startingIndex, endingIndex, columnId) => {
    const column = columns[columnId];
    const items = column.items;
    const heldItem = items[startingIndex];

    if (heldItem) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(startingIndex, 1);
      column.items = updatedItems;
      updatedItems.splice(endingIndex, 0, draggedItem);
      setColumns({
        ...columns,
        [columnId]: column,
      });
    }
  };

  const returnItemsForColumn = (items, columnId) => {
    return items.map((item, index) => (
      <MovableItem
        key={item.id}
        id={item.id}
        index={index}
        name={item.name}
        currentColumnId={columnId}
        moveCardHandler={moveCardHandler}
        setColumns={setColumns}
      />
    ));
  };

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <Column
              key={columnId}
              column={column}
              className="column do-it-column"
              items={column.items}
            >
              {returnItemsForColumn(column.items, columnId)}
            </Column>
          );
        })}
      </DndProvider>
    </div>
  );
}

export default TargetsSettings;
