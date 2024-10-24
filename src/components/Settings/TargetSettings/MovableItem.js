import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import COLUMN_NAMES from "./constants";
import { v4 as uuidv4 } from "uuid";

const MovableItem = ({
  id,
  index,
  name,
  currentColumnName,
  moveCardHandler,
  setItems,
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    console.log("🖥️  columnName: ", columnName);
    delete currentItem.currentColumnName;
    console.log("🖥️  currentItem: ", currentItem);
    setItems((prevState) => {
      console.log("🖥️  prevState: ", prevState);
      const newState = [...prevState, { ...currentItem, column: columnName }];
      console.log("🖥️  newState: ", newState);
      return newState;
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current || item.currentColumnName === "Actions") {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Our first type", // Instead of putting type in item, move it here.
    item: { id, index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log("🖥️  dropResult: ", dropResult);

      if (dropResult) {
        const { name } = dropResult;
        const { SCRIPT, ACTIONS } = COLUMN_NAMES;
        switch (name) {
          case SCRIPT:
            item.id = uuidv4();
            console.log("item in switch ===> ", item);
            changeItemColumn(item, SCRIPT);
            break;
          case ACTIONS:
            changeItemColumn(item, ACTIONS);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
