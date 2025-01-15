import React, { useState, useEffect } from "react";
import { useScript } from "../../../../../context/ScriptContext";
import { useDarkMode } from "../../../../../context/DarkModeContext";

// ========================== Main Function  ========================== //
function Fill({ item, index, handleDelete, baseUrl }) {
  const { darkMode } = useDarkMode();
  const { scriptItems, setScriptItems, testQuery, setTestQuery } = useScript();
  const [locator, setLocator] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      console.log("🖥️  item: ", item);
      console.log("🖥️  item.actions[0]?.errorMessage: ", item.actions[0]);
      setLocator(item.actions[0]?.locator);
      setError(item.errorMessage);
      setTestQuery(item.actions[0]?.testQuery || "");
    }
  }, [item]);

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await window.api.script.getFillLocator(baseUrl, testQuery);
    const newLocator = res.locator;
    const pageUrl = res.newPageUrl;

    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = [{ locator: newLocator, step: 1 }];
    currentItem.endUrl = pageUrl;
    scriptItemsCopy.splice(index, 0, currentItem);
    setLocator(newLocator);
    setScriptItems(scriptItemsCopy);
  };

  // Handle input change for both locator and test query
  const handleInputChange = (e, setState, field) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = [
      {
        ...currentItem.actions[0],
        [field]: e.target.value, // Dynamically update the field
      },
    ];
    console.log("🖥️  currentItem: ", currentItem);
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  return (
    <div>
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
              className={`find-input ${darkMode ? "dark-mode" : ""}`}
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
              className={`find-input ${darkMode ? "dark-mode" : ""}`}
              value={locator}
              onChange={(e) => handleInputChange(e, setLocator, "locator")}
            />
          </label>
          <div className="button-group">
            <button className="find-btn" onClick={(e) => handleClick(e)}>
              Find
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item, "script-item")}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <p
        style={{
          color: "red",
          fontSize: "0.9rem", // Smaller font size
          fontWeight: "600", // Thicker font
          marginTop: "10px", // Spacing from above elements
          marginLeft: "5px", // Optional left margin for alignment
        }}
      >
        {error}
      </p>
    </div>
  );
}

export default Fill;
