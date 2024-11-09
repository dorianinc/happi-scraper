import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useScript } from "../../../context/ScriptContext";

import "./styles/DraggableItem.css";

// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "click":
      return { main: "Click", sub: "Click on an item you see on the page" };
    case "waitForElement":
      return {
        main: "Wait For Element",
        sub: "Wait for an Item to appear on the page",
      };
    case "fill":
      return { main: "Fill", sub: "Fill in text in an input field" };
    case "waitForTimeout":
      return {
        main: "Wait for Timeout",
        sub: "Wait a couple seconds before doing something",
      };
    default:
      return { main: "", sub: "" };
  }
};

// ========================== Main Function  ========================== //
function DraggableItem({ columnName, item, index, handleDelete }) {
  const { scriptItems, setScriptItems } = useScript();
  // Set up state for the input value
  const [inputValue, setInputValue] = useState(item.value || ""); // Initialize with item.value
  // Destructure text based on item type
  const { main: mainText, sub: subText } = getText(item.type);

  const handleChange = (e) => {
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.value = e.target.value;
    scriptItemsCopy.splice(index, 0, currentItem);
    setInputValue(e.target.value);
    setScriptItems(scriptItemsCopy);
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
          {columnName === "Scripts" && (
            <>
              <p>
                <span className={`item-step ${item.type}`}>
                  Step {index + 2}
                </span>
                {mainText}
              </p>
              <div className="script-items">
                <input
                  type="text"
                  placeholder="Search..."
                  className="find-input"
                  value={inputValue} // Bind the input value to the state
                  onChange={(e) => handleChange(e)} // Update the state on change
                />
                <button className="find-btn">Find</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </>
          )}

          {columnName === "Actions" && (
            <>
              <p>{mainText}</p>
              <p className="item-subtext">{subText}</p>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
