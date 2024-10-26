import React from "react";
import { useDrop } from "react-dnd";

const Column = ({ children, className, column }) => {
  // console.log("🖥️  column: ", column)
  // console.log("🖥️  children: ", children)
  const [{ isOver, canDrop }, drop] = useDrop({
    
    accept: "Our first type", // This should match the type in useDrag
    drop: () => {
      return ({ columnId: column.id })
    },
    collect: (monitor) => {
      // this is just saying collect info and return it
      // monitor/watch the status of the movable items...
      // ...and return a boolean if they are or aren't being dragged
      // console.log("isOver ==> ", monitor.isOver());
      // console.log("canDrop ==> ", monitor.canDrop())
      return ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      })
    },

    // Override monitor.canDrop() function
    canDrop: (item) => {
      // console.log("🖥️  item in canDrop in column: ", item)
      // console.log("triggering canDrop in column...");
      const { currentColumnId } = item;
      return true
      // return currentColumnName === "Actions" && title === "Script";
    },
  });

  const getBackgroundColor = () => {
    // console.log("triggering getBackgroundColor...");
    if (isOver) {
      // console.log("triggering conditional #1 in getBackgroundColor");
      if (canDrop) {
        // console.log("triggering conditional #2 in getBackgroundColor");
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        // console.log("triggering conditional #3 in getBackgroundColor");
        return "rgb(255,188,188)";
      }
    } else {
      // console.log("triggering conditional #4 in getBackgroundColor");

      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{column.title}</p>
      {children}
    </div>
  );
};

export default Column;
