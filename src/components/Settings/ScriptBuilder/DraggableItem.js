import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles/DraggableItem.css";

// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "click":
      return { main: "Click", sub: "Click on an item you see on the page" };
    case "waitForElement":
      return { main: "Wait For Element", sub: "Wait for an Item to appear on the page" };
    case "fill":
      return { main: "Fill", sub: "Fill in text in an input field" };
    case "waitForTimeout":
      return { main: "Wait for Timeout", sub: "Wait a couple seconds before doing something" };
    default:
      return { main: "", sub: "" };
  }
};

// ========================== Main Function  ========================== //
function DraggableItem({ columnName, item, index }) {
  const { main: mainText, sub: subText } = getText(item.type);

  const handleDelete = () => {
    console.log("handling delete");
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`action-items ${snapshot.isDragging ? "dragging" : ""} ${
            item.type
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {columnName === "Scripts" && (
            <>
              <p>
                <span className={`item-step ${item.type}`}>
                  Step {index + 2}
                </span>
                {mainText}
              </p>
              <div className="script-items">
                <input
                  type="text"
                  placeholder="Search..."
                  className="find-input"
                  value={item.value || ""}
                />
                <button className="find-btn">Find</button>
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </>
          )}

          {columnName === "Actions" && (
            <>
              <p>{mainText}</p>
              <p className="item-subtext">{subText}</p>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
