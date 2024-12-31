import React from "react";
import { useScript } from "../../../context/ScriptContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import Button from "react-bootstrap/Button";


const InputField = ({ label, value, onChange, field, buttonText = "Find" }) => {
  const { darkMode } = useDarkMode();
  const { scriptItems } = useScript();

  const handleClick = async (e, field) => {
    let newLocator;
    const url = scriptItems[scriptItems.length - 1].endUrl;
    newLocator = await window.api.script.getLocators(url, "single");

    switch (field) {
      case "title":
        setTitleLocator(newLocator);
        break;
      case "image":
        setImageLocator(newLocator);
        break;
      case "price":
        setPriceLocator(newLocator);
        break;
      case "dollar":
        setDollarLocator(newLocator);
        break;
      case "cents":
        setCentsLocator(newLocator);
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }
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
          field={field}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => handleClick(e, field)}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default InputField;
