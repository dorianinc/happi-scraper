import React, { useState } from "react";
import { useScript } from "../../../../../context/ScriptContext";


// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "locatorClick":
      return {
        main: "Click on Element",
        sub: "Click on an item based off css attribute",
      };
    case "coordinateClick":
      return {
        main: "Click on Position",
        sub: "Click on an item off coordinates",
      };

    case "delay":
      return {
        main: "Set Timeout",
        sub: "Pause Script for specific amount of seconds",
      };
    case "fill":
      return { main: "Fill", sub: "Fill in text in an input field" };
    default:
      return { main: "", sub: "" };
  }
};
// ========================== Main Function  ========================== //
function Standard({
  item,
  index,
  handleDelete,
  columnName,
  scriptUrl,
}) {
  // Set up state for the input value
  const { scriptItems, setScriptItems } = useScript();
  const type = item.type;
  const [inputValue, setInputValue] = useState(item.locator || "");

  // Destructure text based on item type
  const { main: mainText, sub: subText } = getText(item.type);

  const handleClick = async (e) => {};

  const handleInputChange = (e, setState) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    const actions = { locator: e.target.value };
    currentItem.actions = actions;
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  return (
    <>
      {columnName === "Actions" ? (
        <div>
          <p>{mainText}</p>
          <p className="item-subtext">{subText}</p>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div>
            <p style={{ fontWeight: "400" }}>
              <span
                className={`item-step ${item.type}`}
                style={{ fontWeight: "500" }}
              >
                Step {index + 1}
              </span>
              {mainText}
            </p>
          </div>
          <div className="script-item">
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
                className={`find-input ${darkMode ? "dark-mode" : ""}`}
                value={inputValue}
                onChange={(e) => handleInputChange(e, setInputValue)}
              />
            </label>
            <div className="button-group">
              <button className="find-btn" onClick={(e) => handleClick(e)}>
                Find
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Standard;
