import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import DraggableItem from "./DraggableItem";
import { Droppable } from "react-beautiful-dnd";
import "./styles/Column.css";
import Button from "react-bootstrap/Button";
import { updateScriptThunk } from "../../../store/scriptsReducer";

// ========================== Main Function  ========================== //
function Column({
  columnId,
  column,
  script,
  items,
  placeholderProps,
  darkMode,
  setColumns,
}) {
  const [scriptItems, setScriptItems] = useState([]);
  const [url, setUrl] = useState(script.url || "");
  const [titleLocation, setTitleLocation] = useState(script.titleLocation || "");
  const [imageLocation, setImageLocation] = useState(script.imageLocation || "");
  const [priceLocation, setPriceLocation] = useState(script.priceLocation || "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      const sortedItems = [...items].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, [items, columnId]);

  useEffect(() => {
    if (script) {
      setUrl(script.url || "");
      setTitleLocation(script.titleLocation || "");
      setImageLocation(script.imageLocation || "");
      setPriceLocation(script.priceLocation || "");
    }
  }, [script]);

  const updateScript = async () => {
    const updatedScript = {
      url: url === "" ? null : url,
      titleLocation: titleLocation === "" ? null : titleLocation,
      imageLocation: imageLocation === "" ? null : imageLocation,
      priceLocation: priceLocation === "" ? null : priceLocation,
    };
    await dispatch(updateScriptThunk(script.id, updatedScript, scriptItems));
  };

  const handleDelete = (item) => {
    const updatedScriptItems = scriptItems.filter((i) => i.id !== item.id);
    setScriptItems(updatedScriptItems);
    setColumns((prevColumns) => ({
      ...prevColumns,
      scriptsColumn: {
        ...prevColumns.scriptsColumn,
        items: updatedScriptItems,
      },
    }));
  };

  const itemDisplay = placeholderProps.display || "none";
  const itemWidth =
    placeholderProps.sourceColumnId === "scriptsColumn"
      ? placeholderProps.clientWidth
      : "fit-content";

  return (
    <div
      className={`columns ${column.title} ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <h3 className="column-title">{column.title}</h3>
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
          droppableId={column.id}
          isDropDisabled={column.title === "Actions"}
        >
          {(provided, snapshot) => (
            <div
              className={`item-list ${column.title} ${
                snapshot.isDraggingOver ? "draggingOver" : ""
              }`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {(columnId === "scriptsColumn" ? scriptItems : items).map(
                (item, i) => (
                  <DraggableItem
                    key={item.id}
                    columnName={column.title}
                    item={item}
                    index={i}
                    handleDelete={handleDelete}
                  />
                )
              )}
              {provided.placeholder}
              {placeholderProps.sourceColumnId === column.id && (
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
                    value={titleLocation}
                    onChange={(e) => setTitleLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label>Image Locator</label>
                  <input
                    type="text"
                    placeholder="Image Locator"
                    value={imageLocation}
                    onChange={(e) => setImageLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price Locator</label>
                  <input
                    type="text"
                    placeholder="Price Locator"
                    value={priceLocation}
                    onChange={(e) => setPriceLocation(e.target.value)}
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
