import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles/DraggableItem.css";

function DraggableItem({ columnName, item, index }) {

  const createMainText = () => {
    const type = item.type;
    switch (type) {
      case "click":
        return "Click";
      case "waitForElement":
        return "Wait For Element";
      case "fill":
        return "Fill";
      case "waitForTimeout":
        return "Wait for Timeout";
    }
  };

  const createSubText = () => {
    const type = item.type;
    switch (type) {
      case "click":
        return "Click on an item you see on the page";
      case "waitForElement":
        return "Wait for an Item to appear on the page";
      case "fill":
        return "Fill in text in an input field";
      case "waitForTimeout":
        return "Wait a couple second before doing something";
    }
  };

  const handleDelete = () => {
    console.log("handling delete")
  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`action-item ${snapshot.isDragging ? "dragging" : ""} ${
            item.type
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* {`${columnName === "Scripts" ? `${index + 1}.` : ""} ${item.content}`} */}

          {columnName === "Scripts" && (
            <>
              <p>
                <span className={`action-step ${item.type}`}>Step {index + 2}</span>
                {createMainText()}
              </p>
              <div className="script-actions">
                <input
                  type="text"
                  placeholder="Search..."
                  className="find-input"
                  value={item.value ? item.value : null}
                />
                <button className="find-btn">Find</button>
                <button className="delete-btn" onClick={() => handleDelete()}>Delete</button>
              </div>
            </>
          )}
          
          {columnName === "Actions" && (
            <>
              <p>{createMainText()}</p>
              <p className="item-subtext">{createSubText()}</p>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
