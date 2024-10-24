import React, { useState } from "react";
import Column from "./Column";
import MovableItem from "./MovableItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import tasks from "./tasks";
import COLUMN_NAMES from "./constants";
import "./potato.css";

function TargetsSettings() {
  const [items, setItems] = useState(tasks);

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        console.log("🖥️  prevItem: ", prevItem)
        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (items, filterByColumn) => {
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
        setItems={setItems}
      />
    ));
  };

  const { SCRIPT, ACTIONS } = COLUMN_NAMES;

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title={SCRIPT} className="column do-it-column">
          {returnItemsForColumn(items, "Script")}
        </Column>
        <Column title={ACTIONS} className="column in-progress-column">
          {returnItemsForColumn(items, "Actions")}
        </Column>
      </DndProvider>
    </div>
  );
}

export default TargetsSettings;
