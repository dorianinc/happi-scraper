import React, { useState, useEffect } from "react";
import { useScript } from "../../../../../context/ScriptContext";

// ========================== Main Function  ========================== //
function Fill({ item, index, handleDelete, baseUrl }) {
  const { scriptItems, setScriptItems } = useScript();
  const [locator, setLocator] = useState("");
  const [testQuery, setTestQuery] = useState("");

  const handleClick = async (e) => {
    const res = await window.api.script.getFillLocator(baseUrl, testQuery);
    const newLocator = res.locator;
    const pageUrl = res.newPageUrl;

    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = [{ locator: newLocator, step: 1 }];
    currentItem.endUrl = pageUrl;
    scriptItemsCopy.splice(index, 0, currentItem);
    setLocator(newLocator)
    setScriptItems(scriptItemsCopy);
  };

  // Handle input change for both locator and test query
  const handleInputChange = (e, setState, field) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = {
      ...currentItem.actions[0],
      [field]: e.target.value, // Dynamically update the field
    };
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  useEffect(() => {
    if (item) {
      setLocator(item.actions[0]?.locator);
      setTestQuery(item.actions[0]?.testQuery || "");
    }
  }, [item]);

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
          Test Query:
          <input
            type="text"
            placeholder="Enter test query..."
            className="find-input"
            value={testQuery}
            onChange={(e) => handleInputChange(e, setTestQuery, "testQuery")}
          />
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Locator:
          <input
            type="text"
            placeholder="Search..."
            className="find-input"
            value={locator}
            onChange={(e) => handleInputChange(e, setLocator, "locator")}
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
