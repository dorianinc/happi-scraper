import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import COLUMN_NAMES from "./constants";
import { v4 as uuidv4 } from "uuid";

const MovableItem = ({
  id,
  index,
  name,
  currentColumnId,
  moveCardHandler,
  setColumns,
}) => {
  const changeItemColumn = (currentItem, columnId) => {
    // console.log("🖥️🥶🥶🥶  currentItem: ", currentItem);
    // console.log("🖥️🥶🥶🥶🥶🥶🥶  columnId: ", columnId);
    // console.log("Triggering changeItemColumn");

    setColumns((prevState) => {
      console.log("🖥️  prevState: ", prevState);

      // Assuming 'prevState' is an object with columns
      const updatedColumns = { ...prevState };

      // Find the column that contains the current item
      let currentColumnId = null;
      Object.keys(updatedColumns).forEach((colId) => {
        const column = updatedColumns[colId];
        if (column.items.some((item) => item.name === currentItem.name)) {
          currentColumnId = colId;
        }
      });

      if (currentColumnId) {
        // Remove the item from its current column
        updatedColumns[currentColumnId].items = updatedColumns[
          currentColumnId
        ].items.filter((item) => item.name !== currentItem.name);

        // Add the item to the new column
        updatedColumns[columnId].items = [
          ...updatedColumns[columnId].items,
          currentItem,
        ];

        // console.log("🖥️ Updated Columns 🥶🥶🥶: ", updatedColumns);
        return updatedColumns;
      }

      return prevState; // If no column was found, return the previous state unchanged
    });
  };
  // const newState = [...prevState, { ...currentItem, column: columnName }];

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    collect(monitor) {
      console.log("hanlderId ==> ", monitor.getHandlerId())
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      // console.log("🖥️  item in hover in moveableitem: ", item);
      // console.log("triggering useDrop in moveable item")
      // console.log("ref =====>>> ", ref);
      if (!ref.current && item.currentColumnId === "actionsColumn") {
        // console.log("🖥️  ref.current: ", ref.current);
        // console.log("triggered conditonal #1 in useDrop")
        return;
      }
      const startingIndex = item.index;
      const endingIndex = index;
      // console.log("🖥️   startingIndex: ", startingIndex);
      // console.log("🖥️  endingIndex : ", endingIndex);

      // Don't replace items with themselves
      if (startingIndex === endingIndex) {
        // console.log("triggered conditonal #2 in useDrop");
        return;
      }

      console.log("🎃🎃🎃");
      console.log("🖥️   startingIndex: ", startingIndex);
      console.log("🖥️  endingIndex : ", endingIndex);
      console.log("🎃🎃🎃");

      // if (startingIndex < endingIndex && hoverClientY < lowerQuarterY) {
      //   console.log("triggered conditonal #3 in useDrop");
      //   // return;
      //   moveCardHandler(startingIndex, endingIndex);
      // }
      // // Dragging upwards
      // if (startingIndex > endingIndex && hoverClientY > upperQuarterY) {
      //   console.log("triggered conditonal #4 in useDrop");
      //   // return;
      //   moveCardHandler(startingIndex, endingIndex);
      // }

      console.log("moving card...");
      // Time to actually perform the action
      moveCardHandler(startingIndex, endingIndex, currentColumnId);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      console.log("item.index");
      item.index = endingIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "Our first type", // Instead of putting type in item, move it here.
    item: { id, index, name, currentColumnId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // console.log("🖥️  dropResult: ", dropResult);
      // console.log("🖥️  dropResult: ", dropResult);
      // console.log("🖥️  dropResult: ", dropResult);
      // console.log("🖥️  dropResult: ", dropResult);

      // console.log("drag ===> ", drag)

      if (dropResult) {
        const { columnId } = dropResult;
        // console.log("🖥️  columnId: ", columnId)
        // console.log("🖥️  item.currentColumnId: ", item.currentColumnId)
        if (columnId !== item.currentColumnId) {
          changeItemColumn(item, columnId);
        }
      }
    },
    collect: (monitor) => {
      // console.log("item in drag ==> ", monitor.getItem());
      return {
        // this is just saying collect info and return it
        // monitor/watch the status of the movable items...
        // ...and return a boolean if they are or aren't being dragged
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {name}
    </div>
  );
};

export default MovableItem;

// function hasMoved(startingIndex, endingIndex) {
//   if (startingIndex === endingIndex) {
//     console.log("triggered conditonal #2 in useDrop");
//     return false;
//   }
//   return true;
// }
