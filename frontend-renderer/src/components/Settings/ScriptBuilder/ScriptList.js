import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { useScript } from "../../../context/ScriptContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import { updateScriptThunk } from "../../../store/scriptsReducer";
import { getSingleScriptThunk } from "../../../store/scriptsReducer";
import DraggableItem from "./DraggableItem";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import { actionItems } from "./data/initialData";
import InputField from "./InputField";
import CustomModal from "../../CustomModal";

import "./styles/ScriptList.css";

// ========================== Main Function ========================== //
const ScriptList = ({ columnId, columnTitle, scripts, script }) => {
  console.log("🖥️  cript: ", script);
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { scriptItems, setScriptItems } = useScript();
  const { shiftScriptItems, testQuery } = useScript();

  const [url, setUrl] = useState("");
  const [titleLocator, setTitleLocator] = useState("");
  const [imageLocator, setImageLocator] = useState("");
  const [priceLocator, setPriceLocator] = useState("");
  const [dollarLocator, setDollarLocator] = useState("");
  const [centsLocator, setCentsLocator] = useState("");
  const [isFullPrice, setIsFullPrice] = useState(true);

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
    if (script) {
      setUrl(script.siteUrl || "");
      setTitleLocator(script.productTitleLocator || "");
      setImageLocator(script.productImageLocator || "");
      setScriptItems(script.items || []);
      if (script.productDollarLocator || script.productCentLocator) {
        setDollarLocator(script.productDollarLocator || "");
        setCentsLocator(script.productCentLocator || "");
        setIsFullPrice(false);
      } else {
        setPriceLocator(script.productPriceLocator || "");
        setIsFullPrice(true);
      }
    }
  }, [script]);

  const handleSelect = async (scriptId) => {
    const { items } = await dispatch(getSingleScriptThunk(scriptId));
    setScriptItems(items);
  };

  const handleDelete = (item) => {
    const updatedScriptItems = scriptItems.filter((i) => i.id !== item.id);
    let sourceIndex = item.step - 1;
    let destinationIndex = updatedScriptItems.length;
    shiftScriptItems(updatedScriptItems, sourceIndex, destinationIndex);
    setScriptItems(updatedScriptItems);
  };

  const updateScript = async (e) => {
    e.preventDefault();
    console.log("script in updatescript function: ", script);
    const scriptId = script.id;

    const updatedScript = {
      siteUrl: url,
      productTitleLocator: titleLocator,
      productImageLocator: imageLocator,
      productPriceLocator: priceLocator,
      productDollarLocator: dollarLocator,
      productCentLocator: centsLocator,
    };

    console.log("🖥️  scriptId: ", scriptId);
    await dispatch(updateScriptThunk({ scriptId, script: updatedScript, scriptItems }));
  };

  const testScript = async (e) => {
    e.preventDefault();
    console.log("script in test script: ", script);
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

    // Dispatch after setting results
    await dispatch(getSingleScriptThunk(scriptId));
  };

  return (
    <div className={`columns ${columnTitle} ${darkMode ? "dark-mode" : ""}`}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className={`column-title ${darkMode ? "dark-mode" : ""}`}>
          {columnTitle}
        </h3>
        {columnTitle === "Scripts" && (
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
              {(columnId === "scriptsColumn" ? scriptItems : actionItems).map(
                (item, i) => (
                  <DraggableItem
                    key={item.id}
                    columnName={columnTitle}
                    item={item}
                    index={i}
                    handleDelete={handleDelete}
                    scriptUrl={url}
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
                    value={titleLocator}
                    field="title"
                    onChange={setTitleLocator}
                  />
                  <InputField
                    label="Image Locator"
                    placeholder="Enter Image Locator"
                    value={imageLocator}
                    field={"image"}
                    onChange={setImageLocator}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  {isFullPrice ? (
                    <InputField
                      label="Price Locator"
                      placeholder="Enter Price Locator"
                      value={priceLocator}
                      field={"price"}
                      onChange={setPriceLocator}
                    />
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <InputField
                        label="Dollar Locator"
                        placeholder="Enter Dollar Locator"
                        value={dollarLocator}
                        field={"dollar"}
                        onChange={setDollarLocator}
                      />
                      <InputField
                        label="Cents Locator"
                        placeholder="Enter Cents Locator"
                        value={centsLocator}
                        field={"cents"}
                        onChange={setCentsLocator}
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
