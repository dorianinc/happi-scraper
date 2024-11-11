import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";

import DraggableItem from "./DraggableItem";
import { updateScriptThunk } from "../../../store/scriptsReducer";
import { useScript } from "../../../context/ScriptContext";
import { actionItems } from "./data/initialData";

import "./styles/Column.css";


// ========================== Main Function  ========================== //
function Column({ columnId, placeholderProps, darkMode, columnTitle }) {
  const dispatch = useDispatch();
  const { script } = useScript();
  const { scriptItems, setScriptItems, shiftScriptItems } = useScript();
  console.log("🖥️  scriptItems: ", scriptItems)
  console.log("🖥️  scriptItems: ", scriptItems)

  const [url, setUrl] = useState(script.url || "");
  const [title, setTitle] = useState(script.title || "");
  const [image, setImage] = useState(script.image || "");
  const [price, setPrice] = useState(script.price || "");

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      const sortedItems = [...scriptItems].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, []);

  useEffect(() => {
    if (script) {
      setUrl(script.url || "");
      setTitle(script.title || "");
      setImage(script.image || "");
      setPrice(script.price || "");
    }
  }, []);

  const updateScript = async (e) => {
    e.preventDefault();
    const updatedScript = {
      url: url === "" ? null : url,
      title: title === "" ? null : title,
      image: image === "" ? null : image,
      price: price === "" ? null : price,
    };
    dispatch(updateScriptThunk(script.id, updatedScript, scriptItems));
  };

  const handleDelete = (item) => {
    const updatedScriptItems = scriptItems.filter((i) => i.id !== item.id);
    let sourceIndex = item.step - 1;
    let destinationIndex = updatedScriptItems.length;
    console.log("🖥️  updatedScriptItems: ", updatedScriptItems);
    shiftScriptItems(updatedScriptItems, sourceIndex, destinationIndex);
    console.log("🖥️  updatedScriptItems: ", updatedScriptItems);
    setScriptItems(updatedScriptItems);
  };

  const itemDisplay = placeholderProps.display || "none";
  const itemWidth =
    placeholderProps.sourceColumnId === "scriptsColumn"
      ? placeholderProps.clientWidth
      : "fit-content";

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
          <div className="goto-container">
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
                  />
                )
              )}
              {provided.placeholder}
              {placeholderProps.sourceColumnId === columnId && (
                <div
                  className="script-item"
                  style={{
                    display: itemDisplay,
                    position: "absolute",
                    top: placeholderProps.clientY,
                    left: placeholderProps.clientX,
                    width: itemWidth,
                    background: "#f9f9f9",
                    opacity: "0.33",
                  }}
                >
                  {placeholderProps.placeholderText}
                </div>
              )}
            </div>
          )}
        </Droppable>

        {columnId === "scriptsColumn" && (
          <>
            <div className="goto-container">
              <p style={{ marginBottom: "10px" }} className="item-step general">
                Compare and Retrieve
              </p>
              <div style={{ display: "flex", gap: "5px" }}>
                <div>
                  <label>Title Locator</label>
                  <input
                    type="text"
                    placeholder="Title Locator"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label>Image Locator</label>
                  <input
                    type="text"
                    placeholder="Image Locator"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price Locator</label>
                  <input
                    type="text"
                    placeholder="Price Locator"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
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
