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
function Standard({ item, index, handleDelete, columnName, scriptUrl }) {
  // Set up state for the input value
  const type = item.type;
  const [inputValue, setInputValue] = useState(item.locator || "");

  // Destructure text based on item type
  const { main: mainText, sub: subText } = getText(item.type);

  const handleClick = async (e) => {
    if (item.type === "coordinateClick") {
      const res = await window.api.script.getCoordinates(scriptUrl);
      setX1(coordinates.x1);
      setX2(coordinates.x2);
      setY1(coordinates.y1);
      setY2(coordinates.y2);
    }

    if (item.type === "coordinateClick") {
      const res = await window.api.script.getLocators(scriptUrl);
      console.log("🖥️  res for clickElement: ", res);
    }
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.locator = e.target.value;
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
                className="find-input"
                value={inputValue}
                onChange={(e) => handleInputChange(e, setInputValue)}
              />
            </label>
            <div className = "button-group">
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
