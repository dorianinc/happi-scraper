import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import DraggableItem from "./DraggableItem";
import { Droppable } from "react-beautiful-dnd";
import "./styles/Column.css";
import Button from "react-bootstrap/Button";
import { updateScriptThunk } from "../../../store/scriptsReducer";

// ========================== Main Function  ========================== //
function Column({
  columnId,
  script,
  items,
  placeholderProps,
  darkMode,
  setScriptItems,
  columnTitle,
}) {
  console.log("🖥️  items: ", items)
  const [url, setUrl] = useState(script.url || "");
  const [titleLocation, setTitleLocation] = useState(
    script.titleLocation || ""
  );
  const [imageLocation, setImageLocation] = useState(
    script.imageLocation || ""
  );
  const [priceLocation, setPriceLocation] = useState(
    script.priceLocation || ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      const sortedItems = [...items].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, []);

  useEffect(() => {
    if (script) {
      setUrl(script.url || "");
      setTitleLocation(script.titleLocation || "");
      setImageLocation(script.imageLocation || "");
      setPriceLocation(script.priceLocation || "");
    }
  }, [script]);

  const updateScript = async () => {
    const updatedScript = {
      url: url === "" ? null : url,
      titleLocation: titleLocation === "" ? null : titleLocation,
      imageLocation: imageLocation === "" ? null : imageLocation,
      priceLocation: priceLocation === "" ? null : priceLocation,
    };
    await dispatch(updateScriptThunk(script.id, updatedScript, items));
  };

  const handleDelete = (item) => {
    const updatedScriptItems = items.filter((i) => i.id !== item.id);
    console.log("🖥️  updatedScriptItems: ", updatedScriptItems);
    setScriptItems(updatedScriptItems);
  };

  const itemDisplay = placeholderProps.display || "none";
  const itemWidth =
    placeholderProps.sourceColumnId === "scriptsColumn"
      ? placeholderProps.clientWidth
      : "fit-content";

  return (
    <div
      className={`columns ${columnTitle} ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <h3 className="column-title">{columnTitle}</h3>
      <hr className="horizontal-line" />
      <div className="inner-container">
        {columnId === "scriptsColumn" && (
          <div className="goto-container">
            <p style={{ marginBottom: "10px" }} className="item-step general">
              Request URL
            </p>
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        )}

        <Droppable
          droppableId={columnId}
          isDropDisabled={columnTitle === "Actions"}
        >
          {(provided, snapshot) => (
            <div
              className={`item-list ${columnTitle} ${
                snapshot.isDraggingOver ? "draggingOver" : ""
              }`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, i) => (
                <DraggableItem
                  key={item.id}
                  columnName={columnTitle}
                  scriptItems={items}
                  item={item}
                  index={i}
                  setScriptItems={setScriptItems}
                  handleDelete={handleDelete}
                />
              ))}
              {provided.placeholder}
              {placeholderProps.sourceColumnId === columnId && (
                <div
                  className="script-item"
                  style={{
                    display: itemDisplay,
                    position: "absolute",
                    top: placeholderProps.clientY,
                    left: placeholderProps.clientX,
                    width: itemWidth,
                    background: "#f9f9f9",
                    opacity: "0.33",
                  }}
                >
                  {placeholderProps.placeholderText}
                </div>
              )}
            </div>
          )}
        </Droppable>

        {columnId === "scriptsColumn" && (
          <>
            <div className="goto-container">
              <p style={{ marginBottom: "10px" }} className="item-step general">
                Compare and Retrieve
              </p>
              <div style={{ display: "flex", gap: "5px" }}>
                <div>
                  <label>Title Locator</label>
                  <input
                    type="text"
                    placeholder="Title Locator"
                    value={titleLocation}
                    onChange={(e) => setTitleLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label>Image Locator</label>
                  <input
                    type="text"
                    placeholder="Image Locator"
                    value={imageLocation}
                    onChange={(e) => setImageLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price Locator</label>
                  <input
                    type="text"
                    placeholder="Price Locator"
                    value={priceLocation}
                    onChange={(e) => setPriceLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="button-container">
              <Button variant="secondary">Test</Button>
              <Button variant="primary" onClick={(e) => updateScript(e)}>
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Column;
