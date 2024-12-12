import React, { useState, useEffect } from "react";
// ========================== Main Function  ========================== //
function Fill({
  item,
  index,
  handleDelete,
  scriptItems,
  setScriptItems,
  scriptUrl,
}) {
  const [locator, setLocator] = useState("");
  const [actions, setActions] = useState([]);

  const handleClick = async (e) => {
    let newLocator;
    newLocator = await window.api.script.getLocators(scriptUrl, "single");

    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions.locator = newLocator;
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  // Destructure text based on item type
  const handleInputChange = (e, setState) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = [{ locator: e.target.value, step: 1 }];
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  useEffect(() => {
    if (item) {
      setLocator(item.actions[0]?.locator);
    }
  });

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
          Fill
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
            value={locator}
            onChange={(e) => handleInputChange(e, setLocator)}
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
  );
}

export default Fill;
