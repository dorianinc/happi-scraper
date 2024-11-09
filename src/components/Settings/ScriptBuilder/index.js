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
  const { setScript } = useScript();
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

      const isScriptColumn = source.droppableId === "scriptsColumn";
      const isActionColumn = source.droppableId === "actionsColumn";

      if (isScriptColumn) {
        const [draggedItem] = scriptItemsCopy.splice(source.index, 1);
        scriptItemsCopy.splice(destination.index, 0, draggedItem);
      } else if (isActionColumn) {
        const draggedItem = actionItems[source.index];
        const newScriptItem = {
          ...draggedItem,
          id: uuidv4(),
          step: destination.index,
          locator: null,
        };
        scriptItemsCopy.splice(destination.index, 0, newScriptItem);
      }

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
        />
      </div>
    </DragDropContext>
  );
}

export default ScriptBuilder;
