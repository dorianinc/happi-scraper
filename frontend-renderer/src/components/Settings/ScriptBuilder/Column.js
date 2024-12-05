import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import DraggableItem from "./DraggableItem";
import { updateScriptThunk } from "../../../store/scriptsReducer";
import { useScript } from "../../../context/ScriptContext";
import { actionItems } from "./data/initialData";

import "./styles/Column.css";

// ================= Reusable InputField Component ================= //
const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  buttonText = "Find",
}) => (
  <div className="input-container">
    <label>{label}</label>
    <div style={{ display: "flex", gap: "5px" }}>
      <input
        type="text"
        className="script-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="primary">{buttonText}</Button>
    </div>
  </div>
);

// ========================== Main Function ========================== //
function Column({ columnId, darkMode, columnTitle, script }) {
  const dispatch = useDispatch();
  const { scriptItems, setScriptItems, shiftScriptItems } = useScript();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [dollarLocator, setDollarLocator] = useState("");
  const [centsLocator, setCentsLocator] = useState("");
  const [togglePriceFormat, setTogglePriceFormat] = useState(false);

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
      if (togglePriceFormat) {
        setDollarLocator(script.dollarLocator || "");
        setCentsLocator(script.centsLocator || "");
      } else {
        setPrice(script.productPriceLocator || "");
      }
      localStorage.setItem("currentScriptId", script.id);
    }
  }, [script, togglePriceFormat]);

  const updateScript = async (e) => {
    e.preventDefault();
    const scriptId = script.id;
    const updatedScript = togglePriceFormat
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
      <h3 className="column-title">{columnTitle}</h3>
      <hr className="horizontal-line" />
      <div className="inner-container">
        {columnId === "scriptsColumn" && (
          <div className="product-locator-container">
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
            <div className="product-locator-container">
              <p style={{ marginBottom: "10px" }} className="item-step general">
                Compare and Retrieve
              </p>
              <div style={{ display: "flex", gap: "5px" }}>
                <InputField
                  label="Title Locator"
                  placeholder="Title Locator"
                  value={title}
                  onChange={setTitle}
                />
                <InputField
                  label="Image Locator"
                  placeholder="Image Locator"
                  value={image}
                  onChange={setImage}
                />
                <div>
                  {togglePriceFormat ? (
                    <div
                      style={{ display: "flex", gap: "5px", marginTop: "10px" }}
                    >
                      <InputField
                        label="Dollar Locator"
                        placeholder="Dollar Locator"
                        value={dollarLocator}
                        onChange={setDollarLocator}
                      />
                      <InputField
                        label="Cents Locator"
                        placeholder="Cents Locator"
                        value={centsLocator}
                        onChange={setCentsLocator}
                      />
                    </div>
                  ) : (
                    <InputField
                      label="Price Locator"
                      placeholder="Price Locator"
                      value={price}
                      onChange={setPrice}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      border: "2px solid red",
                    }}
                  >
                    <div>
                      <label style={{ fontSize: "14px", marginRight: "5px" }}>
                        Full Price
                      </label>
                      <input
                        type="radio"
                        checked={togglePriceFormat}
                        onChange={() =>
                          setTogglePriceFormat(!togglePriceFormat)
                        }
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", marginRight: "5px" }}>
                        Split(dollar/cent)
                      </label>
                      <input
                        type="radio"
                        checked={togglePriceFormat}
                        onChange={() =>
                          setTogglePriceFormat(!togglePriceFormat)
                        }
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
