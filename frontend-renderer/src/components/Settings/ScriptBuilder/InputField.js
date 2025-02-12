import React from "react";
import { useScript } from "../../../context/ScriptContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import Button from "react-bootstrap/Button";

const InputField = ({ label, value, onChange, setLocator }) => {
  const { darkMode } = useDarkMode();
  const { scriptItems } = useScript();

  const handleClick = async (e) => {
    e.preventDefault();

    let newLocator;
    const url = scriptItems[scriptItems.length - 1].endUrl;
    newLocator = await window.api.script.getLocators(url, "single");
    setLocator(newLocator);
  };

  return (
    <div className={`input-container ${darkMode ? "dark-mode" : ""}`}>
      <label
        className={`script-labels ${darkMode ? "dark-mode" : ""}`}
        style={{ fontSize: "14px" }}
      >
        {label}
      </label>
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          className={`script-input ${darkMode ? "dark-mode" : ""}`}
          placeholder="Locator..."
          style={{ width: "100%" }}
          value={value}
          onChange={(e) => setLocator(e.target.value)}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => handleClick(e)}
        >
          Find
        </Button>
      </div>
    </div>
  );
};

export default InputField;
