import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Standard from "./types/Standard";
import Click from "./types/Click";
import Timeout from "./types/Timeout";
import "./DraggableItem.css";

// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "locatorClick":
      return {
        main: "Click on Element",
        sub: "Click on an item based off CSS attribute",
      };
    case "coordinateClick":
      return {
        main: "Click on Position",
        sub: "Click on an item based on coordinates",
      };
    case "delay":
      return {
        main: "Set Timeout",
        sub: "Pause script for a specific amount of seconds",
      };
    case "fill":
      return { main: "Fill", sub: "Fill in text in an input field" };
    default:
      return { main: "", sub: "" };
  }
};

// ========================== Main Function  ========================== //
function DraggableItem({
  columnName,
  item,
  index,
  handleDelete,
  scriptUrl,
  scriptItems,
  setScriptItems,
}) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`draggable-items ${
            snapshot.isDragging ? "dragging" : ""
          } ${item.type}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {columnName === "Scripts" ? (
            item.type === "coordinateClick" || item.type === "locatorClick" ? (
              <Click
                item={item}
                index={index}
                scriptItems={scriptItems}
                setScriptItems={setScriptItems}
                handleDelete={handleDelete}
                scriptUrl={scriptUrl}
              />
            ) : item.type === "delay" ? (
              <Timeout
                item={item}
                index={index}
                scriptItems={scriptItems}
                setScriptItems={setScriptItems}
                handleDelete={handleDelete}
                scriptUrl={scriptUrl}
              />
            ) : (
              <Standard
                item={item}
                index={index}
                columnName={columnName}
                scriptItems={scriptItems}
                setScriptItems={setScriptItems}
                handleDelete={handleDelete}
                scriptUrl={scriptUrl}
              />
            )
          ) : (
            <Standard
              item={item}
              index={index}
              columnName={columnName}
              scriptItems={scriptItems}
              setScriptItems={setScriptItems}
              handleDelete={handleDelete}
              scriptUrl={scriptUrl}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
