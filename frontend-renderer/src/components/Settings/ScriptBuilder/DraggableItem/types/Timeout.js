import React, { useState } from "react";

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
function Timeout({
  item,
  index,
  handleDelete,
  scriptItems,
  setScriptItems,
  scriptUrl,
}) {
  const [inputValue, setInputValue] = useState(item.locator || "");

  // Destructure text based on item type
  const { main: mainText, sub: subText } = getText(item.type);
  const handleInputChange = (e, setState) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.locator = e.target.value;
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  return (
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
          Seconds:
          <input
            type="text"
            placeholder="Set..."
            className="find-input"
            value={inputValue}
            onChange={(e) => handleInputChange(e, setInputValue)}
          />
        </label>
        <div className="button-group">
          <button className="delete-btn" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timeout;
