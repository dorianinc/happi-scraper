import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Click from "./types/Click";
import Standard from "./types/Standard";
import "./DraggableItem.css";

// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "locatorClick":
      return {
        main: "Click on Element",
        sub: "Click on an item based off CSS attribute",
      };
    case "coordinateClick":
      return {
        main: "Click on Position",
        sub: "Click on an item based on coordinates",
      };
    case "delay":
      return {
        main: "Set Timeout",
        sub: "Pause script for a specific amount of seconds",
      };
    case "fill":
      return { main: "Fill", sub: "Fill in text in an input field" };
    default:
      return { main: "", sub: "" };
  }
};

// ========================== Main Function  ========================== //
function DraggableItem({
  columnName,
  item,
  index,
  handleDelete,
  scriptUrl,
  scriptItems,
  setScriptItems,
}) {
  const [inputValue, setInputValue] = useState(item.locator || "");

  const { main: mainText, sub: subText } = getText(item.type);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const updatedScriptItems = [...scriptItems];
    const updatedItem = { ...updatedScriptItems[index], locator: value };
    updatedScriptItems[index] = updatedItem;

    setScriptItems(updatedScriptItems);
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`draggable-items ${
            snapshot.isDragging ? "dragging" : ""
          } ${item.type}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {columnName === "Scripts" &&
          (item.type === "coordinateClick" || item.type === "locatorClick") ? (
            <Click
              item={item}
              index={index}
              handleDelete={handleDelete}
              scriptUrl={scriptUrl}
            />
          ) : (
            <Standard
              item={item}
              index={index}
              columnName={columnName}
              handleDelete={handleDelete}
              scriptUrl={scriptUrl}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
