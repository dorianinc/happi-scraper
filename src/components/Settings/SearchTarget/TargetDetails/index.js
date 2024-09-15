import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import * as TargetActions from "../../../../store/searchTargetsReducer";
import ActionOptions from "./Columns/ActionOptions";
import ActionSteps from "./Columns/ActionSteps";
import initialData from "./initialData";
import { DragDropContext } from "react-beautiful-dnd";
import "./TargetDetails.css";

const TargetDetails = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(initialData);
  console.log("🖥️  list: ", list);

  const target = useSelector((state) => state.searchTarget.currentTarget);

  const handleDragStart = () => {
    document.body.style.color = "orange"
  };

  const handleDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(list.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
  };

  const handleDragEnd = (result) => {
    document.body.style.color = "inherit"
    document.body.style.backgroundColor = "inherit"

    const { destination, source, draggableId } = result;

    // If there is no destination (the task was dropped outside a droppable area)
    if (!destination) {
      return;
    }

    // If the task is dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the column where the drag started
    const startColumn = list.columns[source.droppableId];
    const finishColumn = list.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1); // Remove the task from the original index
      newTaskIds.splice(destination.index, 0, draggableId); // Insert the task at the new index

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newList = {
        ...list,
        columns: {
          ...list.columns,
          [newColumn.id]: newColumn,
        },
      };

      setList(newList);
      return;
    }

    // Moving between different columns (if you have more than one column)
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newList = {
      ...list,
      columns: {
        ...list.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    setList(newList);
  };

  useEffect(() => {
    dispatch(TargetActions.getSingleTargetThunk());
  }, [dispatch]);

  if (!target) return null;

  return (
    <div className="draggables-container">
      <h1 style={{ padding: "20px" }}>{`Target: ${target.siteName}`}</h1>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
        <div className="actions-container">
          <ActionSteps />
          <ActionOptions />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TargetDetails;
