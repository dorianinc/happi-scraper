import React from "react";
import { useDrop } from "react-dnd";

const Column = ({ children, className, column }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ columnId: column.id }),
    hover: (item, monitor) => {
      if (monitor.isOver()) {
        console.log("column ===>", column);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      const { currentColumnId } = item;
      return true;
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      return canDrop ? "rgb(188,251,255)" : "rgb(255,188,188)";
    } else {
      return "";
    }
  };

  return (
    <div ref={drop} className={className} style={{ backgroundColor: getBackgroundColor() }}>
      <p>{column.title}</p>
      {children}
    </div>
  );
};

export default Column;
