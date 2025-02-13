import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { getScriptsThunk } from "../../../store/scriptsReducer";
import { getSingleScriptThunk } from "../../../store/scriptsReducer";
import { useScript } from "../../../context/ScriptContext";
import { actionItems } from "./data/initialData";

import ScriptList from "./ScriptList";
import "./styles/ScriptBuilder.css";

function ScriptBuilder() {
  const dispatch = useDispatch();
  const { shiftScriptItems } = useScript();
  const { scriptItems, setScriptItems } = useScript();
  const [placeholderProps, setPlaceholderProps] = useState({});

  const scripts = useSelector((state) => state.script.allScripts);
  const currentScript = useSelector((state) => state.script.currentScript);

  // Fetch scripts when the component is mounted
  useEffect(() => {
    dispatch(getScriptsThunk()).then((scripts) => {
      dispatch(getSingleScriptThunk(scripts.allScripts[0].id));
    });
  }, []);

  const handleDragEnd = useCallback(
    (result) => {
      setPlaceholderProps({});
      const { source, destination } = result;

      // Exit if no destination or if dropped in the same place
      if (isInvalidDrop(source, destination)) return;

      let sourceIndex;
      let destinationIndex;
      const scriptItemsCopy = [...scriptItems];
      const sourceIsColumn = source.droppableId === "scriptsColumn";
      const sourceIsAction = source.droppableId === "actionsColumn";

      if (sourceIsColumn) {
        sourceIndex = source.index;
        destinationIndex = destination.index;
        const [draggedItem] = scriptItemsCopy.splice(sourceIndex, 1);
        const newScriptItem = {
          ...draggedItem,
          step: destinationIndex + 1,
        };

        scriptItemsCopy.splice(destinationIndex, 0, newScriptItem);
      } else if (sourceIsAction) {
        const draggedItem = actionItems[source.index];
        const newScriptItem = {
          ...draggedItem,
          id: uuidv4(),
          actions: [],
          scriptId: currentScript.id || null,
          step: destination.index + 1,
        };
        scriptItemsCopy.splice(destination.index, 0, newScriptItem);
        if (destination.index < scriptItemsCopy.length - 1) {
          sourceIndex = destination.index + 1;
          destinationIndex = scriptItemsCopy.length;
        }
      }
      shiftScriptItems(scriptItemsCopy, sourceIndex, destinationIndex);
      setScriptItems(scriptItemsCopy);
    },
    [scriptItems]
  );

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
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="drag-drop-container"
      >
        <ScriptList
          type="actions"
          columnId="actionsColumn"
          columnTitle="Actions"
          placeholderProps={placeholderProps}
          scripts={scripts}
        />
        <ScriptList
          type="script"
          columnId={"scriptsColumn"}
          columnTitle="Scripts"
          placeholderProps={placeholderProps}
          scripts={scripts}
          script={currentScript}
        />
      </div>
    </DragDropContext>
  );
}

export default ScriptBuilder;
