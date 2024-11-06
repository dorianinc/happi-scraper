import React, { useState, useEffect } from "react";
import DraggableItem from "./DraggableItem";
import { Droppable } from "react-beautiful-dnd";
import "./styles/Column.css";

// ========================== Helper Functions  ========================== //

// ========================== Main Function  ========================== //
function Column({
  columnId,
  column,
  script,
  items,
  placeholderProps,
  darkMode,
}) {
  const [scriptItems, setScriptItems] = useState([]);

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      const sortedItems = [...items].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, [items, columnId]);

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

      {columnId === "scriptsColumn" && (
        <div className="goto-container">
          <p style={{ marginBottom: "10px" }} className="item-step general">
            Request URL
          </p>
          <input type="text" placeholder="Enter URL" value={script.url} />
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
                  darkMode={darkMode} // Pass darkMode to DraggableItem
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
                value={script.titleLocation}
              />
            </div>
            <div>
              <label>Image Locator</label>
              <input
                type="text"
                placeholder="Image Locator"
                value={script.imageLocation}
              />
            </div>
            <div>
              <label>Price Locator</label>
              <input
                type="text"
                placeholder="Price Locator"
                value={script.priceLocation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;
