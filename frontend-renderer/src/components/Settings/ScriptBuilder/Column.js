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

// ================= Reusable InputField Component ================= //
const InputField = ({ label, value, onChange, buttonText = "Find" }) => (
  <div className="input-container">
    <label style={{ fontSize: "14px" }}>{label}</label>
    <div style={{ display: "flex", gap: "5px" }}>
      <input
        type="text"
        className="script-input"
        placeholder="Locator..."
        style={{ width: "100%" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="primary" size="sm">
        {buttonText}
      </Button>
    </div>
  </div>
);

// ========================== Main Function ========================== //
function Column({ columnId, darkMode, columnTitle, scripts, script }) {
  console.log("🖥️  script in columnn: ", script);
  const dispatch = useDispatch();
  const { scriptItems, setScriptItems, shiftScriptItems } = useScript();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [dollarLocator, setDollarLocator] = useState("");
  const [centsLocator, setCentsLocator] = useState("");
  const [isFullPrice, setIsFullPrice] = useState(true);

  const handleSelect = async (scriptId) => {
    const { scriptItems } = await dispatch(getSingleScriptThunk(scriptId));
    console.log("🖥️  scriptItems: ", scriptItems)
    setScriptItems(scriptItems);
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
      setTitle(script.productTitleLocator || "");
      setImage(script.productImageLocator || "");
      setScriptItems(script.scriptItems || []);
      if (script.productDollarLocator || script.productCentLocator) {
        setDollarLocator(script.productDollarLocator || "");
        setCentsLocator(script.productCentLocator || "");
        setIsFullPrice(false);
      } else {
        setPrice(script.productPriceLocator || "");
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
          title: title || null,
          image: image || null,
          dollarLocator: dollarLocator || null,
          centsLocator: centsLocator || null,
        }
      : {
          url: url || null,
          title: title || null,
          image: image || null,
          price: price || null,
        };
    console.log("🖥️  scriptItems before update: ", scriptItems);
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
                    scriptItems={scriptItems}
                    setScriptItems={setScriptItems}
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
                    value={title}
                    onChange={setTitle}
                  />
                  <InputField
                    label="Image Locator"
                    placeholder="Enter Image Locator"
                    value={image}
                    onChange={setImage}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  {isFullPrice ? (
                    <InputField
                      label="Price Locator"
                      placeholder="Enter Price Locator"
                      value={price}
                      onChange={setPrice}
                    />
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <InputField
                        label="Dollar Locator"
                        placeholder="Enter Dollar Locator"
                        value={dollarLocator}
                        onChange={setDollarLocator}
                      />
                      <InputField
                        label="Cents Locator"
                        placeholder="Enter Cents Locator"
                        value={centsLocator}
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
