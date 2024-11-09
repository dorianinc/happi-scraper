import React, { useState, useEffect, useCallback } from "react";
import { actionItems } from "./data/initialData";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles/ScriptBuilder.css";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  getScriptsThunk,
  getSingleScriptThunk,
} from "../../../store/scriptsReducer";
import { useDarkMode } from "../../../context/DarkModeContext";

function ScriptBuilder() {
  const dispatch = useDispatch();
  const [scriptItems, setScriptItems] = useState([]);

  const [placeholderProps, setPlaceholderProps] = useState({});
  const [script, setScript] = useState({});

  const scripts = useSelector((state) => Object.values(state.script.scripts));

  // Fetch search scripts when the component is mounted
  useEffect(() => {
    dispatch(getScriptsThunk());
  }, [dispatch]);

  const handleSelect = async (scriptId) => {
    const { actions, ...scriptData } = await dispatch(getSingleScriptThunk(scriptId));
    setScript(scriptData);
    setScriptItems(actions);
  };

  // const createPlaceholder = (result, position) => {
  //   const queryAttr = "data-rbd-drag-handle-draggable-id";
  //   const draggableId = result.draggableId;

  //   const sourceColumnId = result.source.droppableId;
  //   const sourceColumn = columns[sourceColumnId];
  //   const itemIndex = result[position].index;
  //   const draggedItem = sourceColumn.items.find(
  //     (item) => item.id === draggableId
  //   );

  //   const placeholderText =
  //     sourceColumnId === "scriptsColumn"
  //       ? `${itemIndex + 1}. ${draggedItem.content}`
  //       : draggedItem.content;

  //   const domQuery = `[${queryAttr}='${draggableId}']`;
  //   const draggedDOM = document.querySelector(domQuery);

  //   if (!draggedDOM) return;

  //   const { clientHeight, clientWidth } = draggedDOM;
  //   const clientY =
  //     parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
  //     [...draggedDOM.parentNode.children]
  //       .slice(0, itemIndex)
  //       .reduce((total, curr) => {
  //         const style = curr.currentStyle || window.getComputedStyle(curr);
  //         const marginBottom = parseFloat(style.marginBottom);
  //         return total + curr.clientHeight + marginBottom;
  //       }, 0);

  //   setPlaceholderProps({
  //     display: "flex",
  //     sourceColumnId,
  //     placeholderText,
  //     clientHeight,
  //     clientWidth,
  //     clientY,
  //     clientX: parseFloat(
  //       window.getComputedStyle(draggedDOM.parentNode).paddingLeft
  //     ),
  //   });
  // };

  // const handleDragStart = useCallback(
  //   (result) => {
  //     if (!result.source) return;
  //     createPlaceholder(result, "source");
  //   },
  //   [columns]
  // );

  // const handleDragUpdate = useCallback(
  //   (result) => {
  //     if (!result.destination) return;
  //     createPlaceholder(result, "destination");
  //   },
  //   [columns]
  // );

  const handleDragEnd = useCallback((result) => {
    setPlaceholderProps({});
    const { source, destination } = result;
  
    // Exit if no destination or if dropped in the same place
    if (invalidDrop(source, destination)) return;
  
    const updatedItems = [...scriptItems];
  
    const isScriptColumn = source.droppableId === "scriptsColumn";
    const isActionColumn = source.droppableId === "actionsColumn";
  
    if (isScriptColumn) {
      const [draggedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, draggedItem);
    } else if (isActionColumn) {
      const draggedItem = actionItems[source.index];
      const newScriptItem = {
        ...draggedItem,
        id: uuidv4(),
        step: destination.index,
        locator: null,
      };
      updatedItems.splice(destination.index, 0, newScriptItem);
    }
  
    setScriptItems(updatedItems);
  }, [scriptItems]);

  const invalidDrop = (source, destination) => {
    if (!destination) return true;
    if (destination.droppableId === "actionsColumn") return true;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return true;
  };

  return (
    <DragDropContext
      onDragEnd={(result) => handleDragEnd(result)}
      // onDragUpdate={handleDragUpdate}
      // onDragStart={handleDragStart}
    >
      <DropdownButton id="dropdown-item-button" title="Select Site">
        {scripts.map((script) => (
          <Dropdown.Item
            key={script.id}
            onClick={() => handleSelect(script.id)}
          >
            {script.siteName}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="drag-drop-container"
      >
        <Column
          key="actionsColumn"
          type="actions"
          columnId="actionsColumn"
          columnTitle="Actions"
          script={script}
          items={actionItems}
          placeholderProps={placeholderProps}
        />
        <Column
          key={"scriptsColumn"}
          type="script"
          columnId={"scriptsColumn"}
          columnTitle="Scripts"
          script={script}
          items={scriptItems}
          setScriptItems={setScriptItems}
          placeholderProps={placeholderProps}
        />
      </div>
    </DragDropContext>
  );
}

export default ScriptBuilder;
