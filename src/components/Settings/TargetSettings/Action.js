import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles/Action.css";

function Action({ columnName, item, index }) {
  console.log("🖥️  item: ", item);

  const createSubText = () => {
    const type = item.action;
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
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`action-item ${snapshot.isDragging ? "dragging" : ""} ${
            item.action
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* {`${columnName === "Scripts" ? `${index + 1}.` : ""} ${item.content}`} */}

          {columnName === "Scripts" && (
            <>
              <p>
                <span className={`action-step ${item.action}`}>Step {index + 1}</span>
                {item.content}
              </p>
              <div className="script-actions">
                <input
                  type="text"
                  placeholder="Search..."
                  className="find-input"
                />
                <button className="find-btn">Find</button>
                <button className="delete-btn">Delete</button>
              </div>
            </>
          )}
          
          {columnName === "Actions" && (
            <>
              <p>{item.content}</p>
              <p className="item-subtext">{createSubText()}</p>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Action;
