import React, { useState } from "react";
import Column from "./Column";
import MovableItem from "./MovableItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import tasks from "./tasks";
import initialData from "./tasks";
import COLUMN_NAMES from "./constants";
import "./potato.css";

function TargetsSettings() {
  // const [items, setItems] = useState(tasks);
  const [columns, setColumns] = useState(initialData.columns);

  const moveCardHandler = (startingIndex, endingIndex, columnId) => {
    console.log("🖕🖕🖕 Triggering moveCardHandler...");
    
    const column = columns[columnId];
    // console.log("🖕🖕🖕 Column:", column);
    
    const items = column.items;
    // console.log("🖕🖕🖕 Items:", items);
    // console.log("🖕🖕🖕 Starting Index:", startingIndex);
    
    const heldItem = items[startingIndex];
    // console.log("🖥️ Held Item:", heldItem);
  
    if (heldItem) {
      // console.log("🖥️👾👾👾 Entering conditional block");
      // console.log("🖥️👾👾👾 Held Item:", heldItem);
      // console.log("🖥️👾👾👾 Starting Index:", startingIndex);
      // console.log("🖥️👾👾👾 Ending Index:", endingIndex);
  
      // Create a copy of the items and update
      const updatedItems = [...items];
      console.log("🖥️ Updated Items (before):", updatedItems);
      
      const [draggedItem] = updatedItems.splice(startingIndex, 1); // Remove item
      // console.log("🖥️ Dragged Item:", [draggedItem]);
      // console.log("🖥️ Updated Items (after):", updatedItems);
  
      column.items = updatedItems;
      // console.log("🖕🖕👾👾👾🖕🖕 Column (after update):", column);
  
      // Insert dragged item at new position
      updatedItems.splice(endingIndex, 0, draggedItem);
      // console.log("🩸🩸🩸🩸 Updated Column Items:", { ...columns, column });
  
      // Update columns with the modified column
      setColumns({
        ...columns,
        [columnId]: column,
      });
    }
  };
  

  const returnItemsForColumn = (items, columnId) => {
    // console.log("triggering returnItemsForColumn...")
    // Filter items by column if filterByColumn is provided
    // const filteredItems = filterByColumnId
    //   ? items.filter((item) => item.column === filterByColumnId)
    //   : items;

    // Return MovableItem components for the filtered items
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

  const { SCRIPT, ACTIONS } = COLUMN_NAMES;

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
        {/* <Column title={SCRIPT} className="column do-it-column">
          {returnItemsForColumn(items, "Script")}
        </Column>
        <Column title={ACTIONS} className="column in-progress-column">
          {returnItemsForColumn(items, "Actions")}
        </Column> */}
      </DndProvider>
    </div>
  );
}

export default TargetsSettings;
