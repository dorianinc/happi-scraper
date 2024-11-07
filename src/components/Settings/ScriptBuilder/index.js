import React, { useState, useEffect, useCallback } from "react";
import initialData from "./data/initialData";
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
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [columns, setColumns] = useState(initialData.columns);
  console.log("🖥️  columns: ", columns);
  const [script, setScript] = useState({});

  const scripts = useSelector((state) => {
    console.log("state ==> ", state.script)
    return Object.values(state.script.scripts)
  });

  // Fetch search scripts when the component is mounted
  useEffect(() => {
    dispatch(getScriptsThunk());
  }, [dispatch]);

  const handleSelect = async (scriptId) => {
    const script = await dispatch(getSingleScriptThunk(scriptId));
    setScript(script);

    setColumns((prevColumns) => ({
      ...prevColumns,
      scriptsColumn: {
        ...prevColumns.scriptsColumn,
        items: [...script.actions], // Update the 'scriptsColumn' with the script actions
      },
    }));
  };

  const createPlaceholder = (result, position) => {
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    const draggableId = result.draggableId;

    const sourceColumnId = result.source.droppableId;
    const sourceColumn = columns[sourceColumnId];
    const itemIndex = result[position].index;
    const draggedItem = sourceColumn.items.find(
      (item) => item.id === draggableId
    );

    const placeholderText =
      sourceColumnId === "scriptsColumn"
        ? `${itemIndex + 1}. ${draggedItem.content}`
        : draggedItem.content;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, itemIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      display: "flex",
      sourceColumnId,
      placeholderText,
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const handleDragStart = useCallback(
    (result) => {
      if (!result.source) return;
      createPlaceholder(result, "source");
    },
    [columns]
  );

  const handleDragUpdate = useCallback(
    (result) => {
      if (!result.destination) return;
      createPlaceholder(result, "destination");
    },
    [columns]
  );

  const handleDragEnd = useCallback(
    (result) => {
      setPlaceholderProps({});
      const { source, destination } = result;

      // Exit if no destination or if dropped in the same place
      if (
        !destination ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      ) {
        return;
      }

      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];

      // Moving within the same column
      if (sourceColumn.id === destinationColumn.id) {
        const newItems = Array.from(sourceColumn.items);
        const [movedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, movedItem);

        setColumns((prevColumns) => ({
          ...prevColumns,
          [sourceColumn.id]: {
            ...sourceColumn,
            items: newItems,
          },
        }));
        return;
      }

      // Moving from "Actions" to "Scripts" should add a new item in "Scripts" but not remove it from "Actions"
      const draggedItem = sourceColumn.items[source.index];
      const newScriptItem = {
        ...draggedItem,
        id: uuidv4(),
        step: destination.index,
        locator: null,
      };

      // Create a new array for the "Scripts" column to add the dragged item
      const newDestinationItems = Array.from(destinationColumn.items);
      newDestinationItems.splice(destination.index, 0, newScriptItem);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumn.id]: {
          ...sourceColumn,
          items: sourceColumn.items, // Ensure the "Actions" column remains the same
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          items: newDestinationItems,
        },
      }));
    },
    [columns]
  );

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragUpdate={handleDragUpdate}
      onDragStart={handleDragStart}
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
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            columnId={columnId}
            column={column}
            script={script}
            items={column.items}
            setColumns={setColumns}
            placeholderProps={placeholderProps}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default ScriptBuilder;
