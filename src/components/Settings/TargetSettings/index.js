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

  const moveCardHandler = (startingIndex, endingIndex) => {
    // console.log("triggering moveCardHandler...")
    const dragItem = items[startingIndex]; // its getting the items assuming they're all in the same array
    // maybe make it so each column it is own separate object with it's own array?

    /*
    items: {
    actions: [item1, item2, etc...]
    scripts: [item3, item4, etc...]
    }

    */

    if (dragItem) {
      console.log("within conditional for moveCardHandler");
      console.log("🖥️👾👾👾  dragItem: ", dragItem);
      console.log("🖥️👾👾👾  startingIndex: ", startingIndex);
      console.log("🖥️👾👾👾  endingIndex : ", endingIndex);
      // setItems((prevState) => {
      //   const coppiedStateArray = [...prevState];
      //   // remove item by "endingIndex" and put "dragItem" instead
      //   const prevItem = coppiedStateArray.splice(endingIndex, 1, dragItem);
      //   // remove item by "startingIndex" and put "prevItem" instead
      //   coppiedStateArray.splice(startingIndex, 1, prevItem[0]);
      //   return coppiedStateArray;
      // })

      const updatedItems = [...items];
      console.log("🖥️  updatedItems before: ", updatedItems);
      const [draggedItem] = updatedItems.splice(startingIndex, 1);
      console.log("dragged item []: ===> ", [draggedItem]);
      console.log("🖥️  updatedItems after: ", updatedItems);

      // Insert the dragged item at the ending position
      // spice is pretty much saying...
      // at that index dont remove anything(0), but add this
      updatedItems.splice(endingIndex, 0, draggedItem);
      setColumns(updatedItems);
    }
  };

  const returnItemsForColumn = (items, filterByColumn) => {
    // console.log("triggering returnItemsForColumn...")
    // Filter items by column if filterByColumn is provided
    const filteredItems = filterByColumn
      ? items.filter((item) => item.column === filterByColumn)
      : items;

    // Return MovableItem components for the filtered items
    return filteredItems.map((item, index) => (
      <MovableItem
        key={item.id}
        id={item.id}
        index={index}
        name={item.name}
        currentColumnName={item.column}
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
              title={column.title}
            >
              {returnItemsForColumn(column.items, column.title)}
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
