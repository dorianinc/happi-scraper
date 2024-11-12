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
<<<<<<< Updated upstream
  const { shiftScriptItems } = useScript();
  const { scriptItems, setScriptItems } = useScript();
=======
  const [script, setScript] = useState({});
  const [scriptItems, setScriptItems] = useState([]);
  const { shiftScriptItems } = useScript();

>>>>>>> Stashed changes
  const [placeholderProps, setPlaceholderProps] = useState({});

  const scripts = useSelector((state) => Object.values(state.script.allScripts));
  console.log("🖥️  scripts: ", scripts)
  const currentScript = useSelector((state) => state.script.currentScript);

  // Fetch search scripts when the component is mounted
  useEffect(() => {
    dispatch(getScriptsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (scripts.length) {
      dispatch(getSingleScriptThunk(scripts[0].id));
    }
  }, [dispatch]);

  const handleSelect = async (scriptId) => {
<<<<<<< Updated upstream
    const { scriptItems } = await dispatch(getSingleScriptThunk(scriptId));
=======
    console.log("🖥️  scriptId: ", scriptId);
    const { scriptItems, ...scriptData } = await dispatch(
      getSingleScriptThunk(scriptId)
    );
    console.log("🖥️  scriptItems: ", scriptItems);
    setScript(scriptData);
>>>>>>> Stashed changes
    setScriptItems(scriptItems);
  };

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
          siteName: currentScript.siteName || null,
          step: destination.index + 1,
          value: null,
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
<<<<<<< Updated upstream
          script={currentScript}
=======
          script={script}
          setScript={setScript}
          scriptItems={scriptItems}
          setScriptItems={setScriptItems}
>>>>>>> Stashed changes
        />
      </div>
    </DragDropContext>
  );
}

export default ScriptBuilder;
