import React, { useState, useEffect } from "react";
import Action from "./Action";
import { Droppable } from "react-beautiful-dnd";
import "./styles/Column.css";

function Column({ columnId, column, script, items, placeholderProps }) {
  console.log("🖥️  script: ", script);
  console.log("🖥️  column: ", column);
  const [scriptItems, setScriptItems] = useState([]);

  useEffect(() => {
    if (columnId && columnId === "scriptsColumn") {
      const sortedItems = [...items].sort((a, b) => a.step - b.step); // Clone and sort
      setScriptItems(sortedItems);
    }
  }, [items, columnId]); // Include items and columnId as dependencies

  const itemDisplay = placeholderProps.display
    ? placeholderProps.display
    : "none";
  const itemWidth =
    placeholderProps.sourceColumnId === "scriptsColumn"
      ? placeholderProps.clientWidth
      : "fit-content";

  return (
    <div className={`columns ${column.title}`}>
      <h3 className="column-title">{column.title}</h3>
      <hr class="horizontal-line" />

      {columnId === "scriptsColumn" && (
        <div className="goto-container">
          <p>Reqest URL Adress</p>
          <input type="text" placeholder="Enter URL" value={script.url}></input>
        </div>
      )}

      <Droppable
        droppableId={column.id}
        isDropDisabled={column.title === "Actions"}
      >
        {(provided, snapshot) => (
          <div
            className={`action-list ${column.title} ${
              snapshot.isDraggingOver ? "draggingOver" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {(columnId === "scriptsColumn" ? scriptItems : items).map(
              (item, i) => (
                <Action
                  key={item.id}
                  columnName={column.title}
                  item={item} // Pass the current item instead of the entire array
                  index={i}
                />
              )
            )}
            {provided.placeholder}
            {placeholderProps.sourceColumnId === column.id && (
              <div
                className="action-item"
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
            <p>Product Name Locator</p>
            <input
              type="text"
              placeholder="Enter Price CSS Locator"
              value={script.titleLocation}
            ></input>
          </div>
          <div className="goto-container">
            <p>Product Image Locator</p>
            <input
              type="text"
              placeholder="Enter Image CSS Locator"
              value={script.imageLocation}
            ></input>
          </div>
          <div className="goto-container">
            <p>Product Price Locator</p>
            <input
              type="text"
              placeholder="Enter Price CSS Locator"
              value={script.priceLocation}
            ></input>
          </div>
        </>
      )}
    </div>
  );
}

export default Column;
