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
  setColumns,
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    console.log("🖥️  currentItem: ", currentItem);
    // console.log("triggering changeItemColumn")
    setColumns((prevState) => {
      const newState = prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column,
        };
      });
      console.log("🖥️  newState: ", newState)
      return newState;
    });
  };
  // const newState = [...prevState, { ...currentItem, column: columnName }];

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      // console.log("triggering useDrop in moveable item")
      if (!ref.current && item.currentColumnName === "Actions") {
        console.log("🖥️  ref.current: ", ref.current);
        // console.log("triggered conditonal #1 in useDrop")
        return;
      }
      const startingIndex = item.index;
      const endingIndex = index;
      // console.log("🖥️   startingIndex: ", startingIndex);
      // console.log("🖥️  endingIndex : ", endingIndex);

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Calculate the full height of the hovered item
      const itemHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;
      // Calculate the lower and upper quarters
      // const lowerQuarterY = itemHeight / 4; // 25% from the top
      // const upperQuarterY = (itemHeight * 3) / 4; // 75% from the top
      const lowerQuarterY = 1; // 25% from the top
      const upperQuarterY = 100; // 75% from the top
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Log values for debugging
      // console.log("🖥️   startingIndex: ", startingIndex);
      // console.log("🖥️  endingIndex : ", endingIndex);
      // console.log("🖥️  hoverClientY : ", hoverClientY);
      // console.log("🖥️  lowerQuarterY: ", lowerQuarterY);
      // console.log("🖥️  upperQuarterY: ", upperQuarterY);

      // Don't replace items with themselves
      if (startingIndex === endingIndex) {
        console.log("triggered conditonal #2 in useDrop");
        return;
      }
      
      console.log("🎃🎃🎃")
      console.log("🖥️   startingIndex: ", startingIndex);
      console.log("🖥️  endingIndex : ", endingIndex);
      console.log("🎃🎃🎃")

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
      moveCardHandler(startingIndex, endingIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      console.log("item.index")
      item.index = endingIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "Our first type", // Instead of putting type in item, move it here.
    item: { id, index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // console.log("🖥️  dropResult: ", dropResult);
      // console.log("drag ===> ", drag)

      if (dropResult) {
        const { name } = dropResult;
        const { SCRIPT, ACTIONS } = COLUMN_NAMES;
        switch (name) {
          case SCRIPT:
            // item.id = uuidv4();
            // console.log("item in switch ===> ", item);
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
