import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Standard from "./types/Standard";
import Fill from "./types/Fill";
import Click from "./types/Click";
import Timeout from "./types/Timeout";
import "./DraggableItem.css";

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
                baseUrl={scriptUrl}
              />
            ) : item.type === "delay" ? (
              <Timeout
                item={item}
                index={index}
                scriptItems={scriptItems}
                setScriptItems={setScriptItems}
                handleDelete={handleDelete}
                baseUrl={scriptUrl}
              />
            ): item.type === "fill" ? (
              <Fill
                item={item}
                index={index}
                scriptItems={scriptItems}
                setScriptItems={setScriptItems}
                handleDelete={handleDelete}
                baseUrl={scriptUrl}
              />
            ) : (
              <Standard
                item={item}
                index={index}
                columnName={columnName}
                scriptItems={scriptItems}
                setScriptItems={setScriptItems}
                handleDelete={handleDelete}
                baseUrl={scriptUrl}
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
              baseUrl={scriptUrl}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
