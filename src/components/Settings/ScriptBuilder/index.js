import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { actionItems } from "./data/initialData";
import Column from "./Column";
import {
  getScriptsThunk,
  getSingleScriptThunk,
} from "../../../store/scriptsReducer";
import { useScript } from "../../../context/ScriptContext";

import "./styles/ScriptBuilder.css";

function ScriptBuilder() {
  const dispatch = useDispatch();
  const { script, setScript } = useScript();
  const { scriptItems, setScriptItems } = useScript();
  const [placeholderProps, setPlaceholderProps] = useState({});

  const scripts = useSelector((state) => Object.values(state.script.scripts));

  // Fetch search scripts when the component is mounted
  useEffect(() => {
    dispatch(getScriptsThunk());
  }, [dispatch]);

  const handleSelect = async (scriptId) => {
    const { actions, ...scriptData } = await dispatch(
      getSingleScriptThunk(scriptId)
    );
    setScript(scriptData);
    setScriptItems(actions);
  };

  const handleDragEnd = useCallback(
    (result) => {
      setPlaceholderProps({});
      const { source, destination } = result;

      // Exit if no destination or if dropped in the same place
      if (isInvalidDrop(source, destination)) return;

      const scriptItemsCopy = [...scriptItems];
      const sourceIsColumn = source.droppableId === "scriptsColumn";
      const sourceIsAction = source.droppableId === "actionsColumn";

      if (sourceIsColumn) {
        const [draggedItem] = scriptItemsCopy.splice(source.index, 1);
        const newScriptItem = {
          ...draggedItem,
          step: destination.index + 1,
        };

        scriptItemsCopy.splice(destination.index, 0, newScriptItem);
        shiftOtherItems(scriptItemsCopy, source.index, destination.index);
      } else if (sourceIsAction) {
        const draggedItem = actionItems[source.index];
        const newScriptItem = {
          ...draggedItem,
          id: uuidv4(),
          siteName: script.siteName || null,
          step: destination.index + 1,
          value: null,
        };
        scriptItemsCopy.splice(destination.index, 0, newScriptItem);
        if (destination.index < scriptItemsCopy.length - 1) {
          const sourceIndex = destination.index + 1;
          const destinationIndex = scriptItemsCopy.length;
          shiftOtherItems(scriptItemsCopy, sourceIndex, destinationIndex);
        }
      }
      console.log("🖥️  scriptItemsCopy: ", scriptItemsCopy);
      setScriptItems(scriptItemsCopy);
    },
    [scriptItems]
  );

  const shiftOtherItems = (scriptItems, sourceIndex, destinationIndex) => {
    let startIndex;
    let endIndex;
    let count;

    if (sourceIndex < destinationIndex) {
      console.log("DRAGGED AN ITEM DOWN");
      startIndex = sourceIndex;
      endIndex = destinationIndex - 1;
      count = startIndex + 1;
    } else {
      console.log("DRAGGED AN ITEM UP");
      startIndex = destinationIndex + 1;
      endIndex = sourceIndex;
      count = startIndex + 1;
    }
    // console.log("🖥️  sourceIndex: ", sourceIndex);
    // console.log("🖥️  destinationIndex: ", destinationIndex);
    // console.log("🖥️  startIndex: ", startIndex);
    // console.log("🖥️  endIndex: ", endIndex);

    while (startIndex <= endIndex) {
      console.log("count ===> ", count);
      const item = scriptItems[startIndex];
      item.step = count;
      count++;
      startIndex++;
    }
  };

  const isInvalidDrop = (source, destination) => {
    if (!destination) return true;
    if (destination.droppableId === "actionsColumn") return true;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return true;
  };

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
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
          type="actions"
          columnId="actionsColumn"
          columnTitle="Actions"
          placeholderProps={placeholderProps}
        />
        <Column
          type="script"
          columnId={"scriptsColumn"}
          columnTitle="Scripts"
          placeholderProps={placeholderProps}
        />
      </div>
    </DragDropContext>
  );
}

export default ScriptBuilder;
