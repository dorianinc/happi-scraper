import React, { useState, useEffect } from "react";
import Action from "./Action";
import { Droppable } from "react-beautiful-dnd";
import "./styles/Column.css";

function Column({ columnId, column, items, placeholderProps }) {
  const [scriptItems, setScriptItems] = useState([]);

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      // Sort the scriptItems
      const sortedItems = [...items].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, [items, columnId]);

  const itemsToRender = columnId === "scriptsColumn" ? scriptItems : items;

  return (
    <div className={`columns ${column.title}`}>
      <h3 className="column-title">{column.title}</h3>
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
            {itemsToRender.map((item, i) => (
              <Action
                key={item.id}
                columnName={column.title}
                item={item}
                index={i}
              />
            ))}
            {provided.placeholder}
            {placeholderProps.sourceColumnId === column.id && (
              <div
                className="action-item"
                style={{
                  display: placeholderProps.display,
                  position: "absolute",
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  width: placeholderProps.clientWidth,
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
    </div>
  );
}

export default Column;
