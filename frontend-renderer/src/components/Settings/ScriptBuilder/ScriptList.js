import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { useScript } from "../../../context/ScriptContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import { createScriptThunk } from "../../../store/scriptsReducer";
import { getSingleScriptThunk } from "../../../store/scriptsReducer";
import { updateScriptThunk } from "../../../store/scriptsReducer";
import { deleteScriptThunk } from "../../../store/scriptsReducer";
import DraggableItem from "./DraggableItem";
import InputField from "./InputField";
import CustomModal from "../../CustomModal";
import { actionItems } from "./data/initialData";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./styles/ScriptList.css";

// ========================== Child Function ========================== //
const MenuClick = React.forwardRef(({ children, onClick }, ref) => {
  const { darkMode } = useDarkMode();
  return (
    <i
      ref={ref}
      className={`
        script-option-ellipsis
        fa-solid fa-ellipsis-vertical fa-2xs 
        ${darkMode ? "dark-mode" : ""}
        `}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </i>
  );
});

// ========================== Main Function ========================== //
const ScriptList = ({ columnId, columnTitle, scripts, script }) => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { scriptItems, setScriptItems } = useScript();
  const { shiftScriptItems, testQuery } = useScript();

  const [editing, setEditing] = useState(false);
  const [scriptTitle, setScriptTitle] = useState("");
  const [isFullPrice, setIsFullPrice] = useState(true);

  const [siteUrl, setSiteUrl] = useState("");
  const [productTitleLocator, setProductTitleLocator] = useState("");
  const [productImageLocator, setProductImageLocator] = useState("");
  const [productPriceLocator, setProductPriceLocator] = useState("");
  const [productDollarLocator, setProductDollarLocator] = useState("");
  const [productCentLocator, setProductCentLocator] = useState("");

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (columnId === "scriptsColumn") {
      const sortedItems = [...scriptItems].sort((a, b) => a.step - b.step);
      setScriptItems(sortedItems);
    }
  }, []);

  useEffect(() => {
    console.log("script has changed or been edited");
    if (script) {
      setScriptTitle(script.siteName || "Untitled");
      setSiteUrl(script.siteUrl || "");
      setProductTitleLocator(script.productTitleLocator || "");
      setProductImageLocator(script.productImageLocator || "");
      setScriptItems(script.items || []);
      if (script.productDollarLocator || script.productCentLocator) {
        setProductDollarLocator(script.productDollarLocator || "");
        setProductCentLocator(script.productCentLocator || "");
        setIsFullPrice(false);
      } else {
        setProductPriceLocator(script.productPriceLocator || "");
        setIsFullPrice(true);
      }
    }
  }, [script]);

  // ------------------ handle functions ------------------ //
  const handleEdit = async () => {
    await setEditing(true);
    const input = document.getElementById("script-name-input");
    input.focus();
  };
  const handleKeyDown = async (e) => {
    // e.preventDefault();
    if (e.key !== "Enter") return;
    if (scriptTitle !== script.siteName) {
      dispatch(
        updateScriptThunk({
          scriptId: script.id,
          script: { siteName: scriptTitle },
        })
      );
    }
    await setEditing(false);
  };

  const handleBlur = async (e) => {
    e.preventDefault();
    if (scriptTitle !== script.siteName) {
      dispatch(
        updateScriptThunk({
          scriptId: script.id,
          script: { siteName: scriptTitle },
        })
      );
    }
    await setEditing(false);
  };

  const handleSelect = async (scriptId) => {
    const { items } = await dispatch(getSingleScriptThunk(scriptId));
    setScriptItems(items);
  };

  const handleDelete = async (item = null, type) => {
    if (type === "script") {
      const res = await dispatch(deleteScriptThunk(script.id));
      if (res.length) {
        dispatch(getSingleScriptThunk(res[0].id));
      }
    } else if (type === "script-item") {
      const updatedScriptItems = scriptItems.filter((i) => i.id !== item.id);
      let sourceIndex = item.step - 1;
      let destinationIndex = updatedScriptItems.length;
      shiftScriptItems(updatedScriptItems, sourceIndex, destinationIndex);
      setScriptItems(updatedScriptItems);
    }
  };

  // ------------------ script functions ------------------ //

  const createScript = async (e) => {
    await dispatch(createScriptThunk());
  };

  const updateScript = async (e) => {
    e.preventDefault();
    await dispatch(
      updateScriptThunk({
        scriptId: script.id,
        script: {
          siteUrl,
          productTitleLocator,
          productImageLocator,
          productPriceLocator,
          productDollarLocator,
          productCentLocator,
        },
        scriptItems,
      })
    );
  };

  const testScript = async (e) => {
    e.preventDefault();
    const scriptId = script.id;

    // Display "Testing in progress..." message in the modal
    setModalContent(
      <div className="modal-loading-container">
        <h3 className="modal-title loading">Testing in progress...</h3>
        <Spinner animation="border" variant="secondary" />
      </div>
    );
    setShowModal(true); // Show the modal immediately

    try {
      const res = await window.api.script.testScript({
        scriptId,
        name: testQuery,
      });

      if (res.numResults > 0) {
        const avgPrice = res.avgPrice;
        const numResults = res.numResults;

        if (numResults > 0) {
          setModalContent(
            <>
              <h3 className="modal-title success">
                {numResults} matches found for{" "}
                <span className="test-query">{testQuery}</span>
              </h3>
              <div className="modal-avg-price-container">
                <p className={`modal-avg-price ${darkMode ? "dark-mode" : ""}`}>
                  Average Price:{" "}
                  <span className="modal-price">${avgPrice}</span>
                </p>
              </div>
            </>
          );
        }
      } else {
        setModalContent(
          <>
            <h3 className="modal-title fail">
              No matches found for{" "}
              <span className="test-query">{testQuery}</span>
            </h3>
          </>
        );
      }
    } catch (error) {
      console.error("Error running test script:", error);
      setModalContent(
        <>
          <h3 className="modal-title error">
            An error occurred while testing.
          </h3>
        </>
      );
    }

    await dispatch(getSingleScriptThunk(scriptId));
  };

  return (
    <div className={`columns ${columnTitle} ${darkMode ? "dark-mode" : ""}`}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className={`column-title ${darkMode ? "dark-mode" : ""}`}>
          {columnId === "actionsColumn" ? (
            "Actions"
          ) : (
            <>
              {!editing ? (
                scriptTitle
              ) : (
                <input
                  id="script-name-input"
                  value={scriptTitle}
                  onChange={(e) => setScriptTitle(e.target.value)}
                  onBlur={(e) => handleBlur(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                ></input>
              )}
              <Dropdown>
                <Dropdown.Toggle
                  as={MenuClick}
                  id="dropdown-custom-components"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEdit()}>
                    Edit Name
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(null, "script")}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </h3>
        {columnTitle === "Scripts" && (
          <DropdownButton id="dropdown-item-button" title="Select Script">
            <Dropdown.Item
              key={0}
              onClick={(e) => createScript(e)}
              style={{ fontWeight: "500" }}
            >
              [New Script]
            </Dropdown.Item>
            <Dropdown.Divider />
            {scripts.map((script) => (
              <Dropdown.Item
                key={script.id}
                onClick={() => handleSelect(script.id)}
              >
                {script.siteName}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </div>
      <hr className="horizontal-line" />
      <div className={`inner-container ${darkMode ? "dark-mode" : ""}`}>
        {columnId === "scriptsColumn" && (
          <div
            className={`script-inner-container ${darkMode ? "dark-mode" : ""}`}
          >
            <p style={{ marginBottom: "10px" }} className="item-step general">
              Request URL
            </p>
            <input
              type="text"
              className={`${darkMode ? "dark-mode" : ""}`}
              placeholder="Enter URL"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
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
              {(columnId === "scriptsColumn" ? scriptItems : actionItems).map(
                (item, i) => (
                  <DraggableItem
                    key={item.id}
                    columnName={columnTitle}
                    item={item}
                    index={i}
                    handleDelete={handleDelete}
                    scriptUrl={siteUrl}
                  />
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {columnId === "scriptsColumn" && (
          <>
            <div
              className={`script-inner-container  product ${
                darkMode ? "dark-mode" : ""
              }`}
            >
              <p style={{ marginBottom: "10px" }} className="item-step general">
                Product Locators
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "space-around",
                    width: "50%",
                    maxWidth: "50%",
                  }}
                >
                  <InputField
                    label="Title Locator"
                    placeholder="Enter Title Locator"
                    value={productTitleLocator}
                    field="title"
                    setLocator={setProductTitleLocator}
                  />
                  <InputField
                    label="Image Locator"
                    placeholder="Enter Image Locator"
                    value={productImageLocator}
                    field={"image"}
                    setLocator={setProductImageLocator}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  {isFullPrice ? (
                    <InputField
                      label="Price Locator"
                      placeholder="Enter Price Locator"
                      value={productPriceLocator}
                      field={"price"}
                      setLocator={setProductPriceLocator}
                    />
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <InputField
                        label="Dollar Locator"
                        placeholder="Enter Dollar Locator"
                        value={productDollarLocator}
                        field={"dollar"}
                        setLocator={setProductDollarLocator}
                      />
                      <InputField
                        label="Cents Locator"
                        placeholder="Enter Cents Locator"
                        value={productCentLocator}
                        field={"cents"}
                        setLocator={setProductCentLocator}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label
                        className={`script-labels ${
                          darkMode ? "dark-mode" : ""
                        }`}
                        style={{ fontSize: "14px", marginRight: "5px" }}
                      >
                        Full Price
                      </label>
                      <input
                        type="radio"
                        name="price"
                        checked={isFullPrice}
                        onChange={() => setIsFullPrice(true)}
                      />
                    </div>
                    <div>
                      <label
                        className={`script-labels ${
                          darkMode ? "dark-mode" : ""
                        }`}
                        style={{ fontSize: "14px", marginRight: "5px" }}
                      >
                        Split(dollar/cent)
                      </label>
                      <input
                        type="radio"
                        name="price"
                        checked={!isFullPrice}
                        onChange={() => setIsFullPrice(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <Button variant="secondary" onClick={(e) => testScript(e)}>
                Test
              </Button>
              <Button
                variant="primary"
                onClick={(e) => updateScript(e, script)}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Show Modal if showModal is true */}
      <CustomModal
        show={showModal}
        setShow={setShowModal}
        modalContent={modalContent}
      />
    </div>
  );
};

export default ScriptList;
