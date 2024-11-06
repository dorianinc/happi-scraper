import React, { useState, useEffect } from "react";
import DraggableItem from "./DraggableItem";
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
      <hr className="horizontal-line" />

      {columnId === "scriptsColumn" && (
        <div className="goto-container">
          <p>
            <span className={`action-step general`}>Step 1</span>
            Request URL
          </p>
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
                <DraggableItem
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
            <p>
              <span className={`action-step general`}>Step {scriptItems.length + 1}</span>
              Get Title
            </p>
            <input
              type="text"
              placeholder="Enter Price CSS Locator"
              value={script.titleLocation}
            ></input>
          </div>
          <div className="goto-container">
            <p>
              <span className={`action-step general`}>Step {scriptItems.length + 2}</span>
              Get Image
            </p>
            <input
              type="text"
              placeholder="Enter Image CSS Locator"
              value={script.imageLocation}
            ></input>
          </div>
          <div className="goto-container">
            <p>
              <span className={`action-step general`}>Step {scriptItems.length + 3}</span>
              Get Price
            </p>
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
