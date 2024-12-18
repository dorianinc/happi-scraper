import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import { updateScriptThunk } from "../../../store/scriptsReducer";
import { useScript } from "../../../context/ScriptContext";
import { actionItems } from "./data/initialData";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { getSingleScriptThunk } from "../../../store/scriptsReducer";

import "./styles/Column.css";

// ========================== Main Function ========================== //
function Column({ columnId, darkMode, columnTitle, scripts, script }) {
  const dispatch = useDispatch();
  const { scriptItems, setScriptItems, shiftScriptItems } = useScript();

  const [url, setUrl] = useState("");
  const [titleLocator, setTitleLocator] = useState("");
  const [imageLocator, setImageLocator] = useState("");
  const [priceLocator, setPriceLocator] = useState("");
  const [dollarLocator, setDollarLocator] = useState("");
  const [centsLocator, setCentsLocator] = useState("");
  const [isFullPrice, setIsFullPrice] = useState(true);

  // ================= helper functions ================= //

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

  // ================= Reusable InputField Component ================= //
  const InputField = ({
    label,
    value,
    onChange,
    field,
    buttonText = "Find",
  }) => (
    <div className="input-container">
      <label style={{ fontSize: "14px" }}>{label}</label>
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          className="script-input"
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

  const handleSelect = async (scriptId) => {
    const { items } = await dispatch(getSingleScriptThunk(scriptId));
    setScriptItems(items);
  };

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      const sortedItems = [...scriptItems].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, []);

  useEffect(() => {
    if (script) {
      setUrl(script.siteUrl || "");
      setTitleLocator(script.productTitleLocator || "");
      setImageLocator(script.productImageLocator || "");
      setScriptItems(script.items || []);
      if (script.productDollarLocator || script.productCentLocator) {
        setDollarLocator(script.productDollarLocator || "");
        setCentsLocator(script.productCentLocator || "");
        setIsFullPrice(false);
      } else {
        setPriceLocator(script.productPriceLocator || "");
        setIsFullPrice(true);
      }
      localStorage.setItem("currentScriptId", script.id);
    }
  }, [script]);

  const updateScript = async (e) => {
    e.preventDefault();
    const scriptId = script.id;
    const updatedScript = isFullPrice
      ? {
          url: url || null,
          title: titleLocator || null,
          image: imageLocator || null,
          dollarLocator: dollarLocator || null,
          centsLocator: centsLocator || null,
        }
      : {
          url: url || null,
          title: titleLocator || null,
          image: imageLocator || null,
          price: priceLocator || null,
        };
    dispatch(updateScriptThunk({ scriptId, updatedScript, scriptItems }));
  };

  const handleDelete = (item) => {
    const updatedScriptItems = scriptItems.filter((i) => i.id !== item.id);
    let sourceIndex = item.step - 1;
    let destinationIndex = updatedScriptItems.length;
    shiftScriptItems(updatedScriptItems, sourceIndex, destinationIndex);
    setScriptItems(updatedScriptItems);
  };

  return (
    <div
      className={`columns ${columnTitle} ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="column-title">{columnTitle}</h3>
        {columnTitle === "Scripts" && (
          <DropdownButton id="dropdown-item-button" title="Select Site">
            {scripts.map((script) => (
              <Dropdown.Item
                key={script.id}
                onClick={() => handleSelect(script.id)}
              >
                {script.siteName}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </div>
      <hr className="horizontal-line" />
      <div className="inner-container">
        {columnId === "scriptsColumn" && (
          <div className="script-inner-container">
            <p style={{ marginBottom: "10px" }} className="item-step general">
              Request URL
            </p>
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        )}

        <Droppable
          droppableId={columnId}
          isDropDisabled={columnTitle === "Actions"}
        >
          {(provided, snapshot) => (
            <div
              className={`item-list ${columnTitle} ${
                snapshot.isDraggingOver ? "draggingOver" : ""
              }`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {(columnId === "scriptsColumn" ? scriptItems : actionItems).map(
                (item, i) => (
                  <DraggableItem
                    key={item.id}
                    columnName={columnTitle}
                    item={item}
                    index={i}
                    handleDelete={handleDelete}
                    scriptUrl={url}
                  />
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {columnId === "scriptsColumn" && (
          <>
            <div className="script-inner-container product">
              <p style={{ marginBottom: "10px" }} className="item-step general">
                Product Locators
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "space-around",
                    width: "50%",
                    maxWidth: "50%",
                  }}
                >
                  <InputField
                    label="Title Locator"
                    placeholder="Enter Title Locator"
                    value={titleLocator}
                    field="title"
                    onChange={setTitleLocator}
                  />
                  <InputField
                    label="Image Locator"
                    placeholder="Enter Image Locator"
                    value={imageLocator}
                    field={"image"}
                    onChange={setImageLocator}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  {isFullPrice ? (
                    <InputField
                      label="Price Locator"
                      placeholder="Enter Price Locator"
                      value={priceLocator}
                      field={"price"}
                      onChange={setPriceLocator}
                    />
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <InputField
                        label="Dollar Locator"
                        placeholder="Enter Dollar Locator"
                        value={dollarLocator}
                        field={"dollar"}
                        onChange={setDollarLocator}
                      />
                      <InputField
                        label="Cents Locator"
                        placeholder="Enter Cents Locator"
                        value={centsLocator}
                        field={"cents"}
                        onChange={setCentsLocator}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label style={{ fontSize: "14px", marginRight: "5px" }}>
                        Full Price
                      </label>
                      <input
                        type="radio"
                        name="price"
                        checked={isFullPrice}
                        onChange={() => setIsFullPrice(true)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", marginRight: "5px" }}>
                        Split(dollar/cent)
                      </label>
                      <input
                        type="radio"
                        name="price"
                        checked={!isFullPrice}
                        onChange={() => setIsFullPrice(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <Button variant="secondary">Test</Button>
              <Button variant="primary" onClick={(e) => updateScript(e)}>
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Column;
