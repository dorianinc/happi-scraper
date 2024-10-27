import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const MovableItem = ({ id, index, name, currentColumnId, moveCardHandler, setColumns }) => {
  const changeItemColumn = (currentItem, columnId) => {
    setColumns((prevState) => {
      const updatedColumns = { ...prevState };
      let foundColumnId = null;
      Object.keys(updatedColumns).forEach((colId) => {
        const column = updatedColumns[colId];
        if (column.items.some((item) => item.name === currentItem.name)) {
          foundColumnId = colId;
        }
      });
      if (foundColumnId) {
        updatedColumns[foundColumnId].items = updatedColumns[foundColumnId].items.filter((item) => item.name !== currentItem.name);
        updatedColumns[columnId].items = [...updatedColumns[columnId].items, currentItem];
        return updatedColumns;
      }
      return prevState;
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      const startingIndex = item.index;
      const endingIndex = index;
      if (startingIndex === endingIndex) return;
      moveCardHandler(startingIndex, endingIndex, currentColumnId);
      item.index = endingIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Our first type",
    item: { id, index, name, currentColumnId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { columnId } = dropResult;
        if (columnId !== item.currentColumnId) {
          changeItemColumn(item, columnId);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity: isDragging ? 0.4 : 1 }}>
      {name}
    </div>
  );
};

export default MovableItem;
