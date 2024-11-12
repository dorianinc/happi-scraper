import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { useScript } from "../../../context/ScriptContext";

import "./styles/DraggableItem.css";

// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "clickOnElement":
      return {
        main: "Click on Element",
        sub: "Click on an item based off css attribute",
      };
    case "clickOnPosition":
      return {
        main: "Click on Position",
        sub: "Click on an item off coordinates",
      };
    case "waitForElement":
      return {
        main: "Wait for Element",
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
            <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
              <p style={{ fontWeight: "400" }}>
                <span
                  className={`item-step ${item.type}`}
                  style={{ fontWeight: "500" }}
                >
                  Step {index + 1}
                </span>
                {mainText}
              </p>

              <div className="script-items">
                {item.type === "clickOnPosition" ? (
                  <>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      x1:
                      <input
                        type="text"
                        placeholder="Search..."
                        className="find-input"
                        value={inputValue}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      x2:
                      <input
                        type="text"
                        placeholder="Search..."
                        className="find-input"
                        value={inputValue}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      y1:
                      <input
                        type="text"
                        placeholder="Search..."
                        className="find-input"
                        value={inputValue}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      y2:
                      <input
                        type="text"
                        placeholder="Search..."
                        className="find-input"
                        value={inputValue}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                  </>
                ) : (
                  <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  locator:
                  <input
                    type="text"
                    placeholder="Search..."
                    className="find-input"
                    value={inputValue}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
                )}
                <button className="find-btn">Find</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </div>
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
