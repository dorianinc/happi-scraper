import React, { useState, useEffect } from "react";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useScript } from "../../../../../context/ScriptContext";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

// ========================== Helper Functions  ========================== //
const AccordionToggle = ({ eventKey }) => {
  const { darkMode } = useDarkMode();
  const [opened, setOpened] = useState(false);

  const handleClick = useAccordionButton(eventKey, () => {
    setOpened((prevState) => !prevState);
  });

  return (
    <button
      className={` accordion-button-icon ${darkMode ? "dark-mode" : ""}`}
      type="button"
      style={{
        marginLeft: "10px",
      }}
      onClick={handleClick}
    >
      <i class={`fa-solid fa-chevron-${!opened ? "down" : "up"}`} />
    </button>
  );
};

// ========================== Main Function  ========================== //
function Click({ item, index, handleDelete, baseUrl }) {
  const { darkMode } = useDarkMode();
  const { scriptItems, setScriptItems } = useScript();
  // Set up state for the input value
  const type = item.type;
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (item.actions) {
      setActions(item.actions);
    }
  }, [item]);

  // Destructure text based on item type
  const mainText =
    item.type === "locatorClick" ? "Click on Element" : "Click on Position";

  const handleClick = async (e) => {
    let actions;
    let endUrl;
    let scriptUrl;
    let res;
    if (index > 0) {
      scriptUrl = scriptItems[index - 1].endUrl;
    } else {
      scriptUrl = baseUrl;
    }
    if (item.type === "coordinateClick") {
      res = await window.api.script.getCoordinates(scriptUrl);
    }

    if (item.type === "locatorClick") {
      res = await window.api.script.getLocators(scriptUrl, "multi");
    }
    actions = res.actions;
    endUrl = res.endUrl || scriptUrl;
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = actions;
    currentItem.endUrl = endUrl;
    scriptItemsCopy.splice(index, 0, currentItem);
    setActions(actions);
    setScriptItems(scriptItemsCopy);
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.locator = e.target.value;
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  return (
    <Accordion>
      <Accordion eventKey={index.toString()}>
        <Card>
          <Card.Header className={`${darkMode ? "dark-mode" : ""}`}>
            <div className="accordion-header">
              <div>
                <span
                  className={`item-step ${item.type}`}
                  style={{ fontWeight: "500" }}
                >
                  Step {index + 1}
                </span>{" "}
                {mainText}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  boxSizing: "border-box",
                  padding: "5px",
                }}
              >
                <button className="find-btn" onClick={(e) => handleClick(e)}>
                  Find
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
                <AccordionToggle eventKey={index.toString()} />
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body className={`${darkMode ? "dark-mode" : ""}`}>
              <div className="script-items">
                {actions.map((action, actionIndex) => {
                  return (
                    <div
                      className="script-sub-items"
                      key={`action-${actionIndex}`}
                    >
                      <div style={{ display: "flex", gap: "5px" }}>
                        <p style={{ fontWeight: "500" }}>
                          Step {index + 1}.{actionIndex + 1}:
                        </p>
                        <p style={{ marginRight: "10px" }}>Click @</p>
                      </div>
                      {type === "coordinateClick" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            x1:
                            <input
                              type="text"
                              placeholder="x1"
                              className={`find-input coordinates ${
                                darkMode ? "dark-mode" : ""
                              }`}
                              value={action.x1 || 0}
                              onChange={(e) =>
                                handleInputChange(e, (val) => {
                                  action.x1 = val;
                                  setScriptItems([...scriptItems]);
                                })
                              }
                            />
                          </label>
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            x2:
                            <input
                              type="text"
                              placeholder="x2"
                              className={`find-input coordinates ${
                                darkMode ? "dark-mode" : ""
                              }`}
                              value={action.x2 || 0}
                              onChange={(e) =>
                                handleInputChange(e, (val) => {
                                  action.x2 = val;
                                  setScriptItems([...scriptItems]);
                                })
                              }
                            />
                          </label>
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            y1:
                            <input
                              type="text"
                              placeholder="y1"
                              className={`find-input coordinates ${
                                darkMode ? "dark-mode" : ""
                              }`}
                              value={action.y1 || 0}
                              onChange={(e) =>
                                handleInputChange(e, (val) => {
                                  action.y1 = val;
                                  setScriptItems([...scriptItems]);
                                })
                              }
                            />
                          </label>
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            y2:
                            <input
                              type="text"
                              placeholder="y2"
                              className={`find-input coordinates ${
                                darkMode ? "dark-mode" : ""
                              }`}
                              value={action.y2 || 0}
                              onChange={(e) =>
                                handleInputChange(e, (val) => {
                                  action.y2 = val;
                                  setScriptItems([...scriptItems]);
                                })
                              }
                            />
                          </label>
                        </div>
                      )}
                      {type === "locatorClick" && (
                        <div>
                          <label
                            style={{
                              display: "flex",
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Search..."
                              className={`find-input ${
                                darkMode ? "dark-mode" : ""
                              }`}
                              value={action.locator || ""}
                              onChange={(e) =>
                                handleInputChange(e, (val) => {
                                  action.locator = val;
                                  setScriptItems([...scriptItems]);
                                })
                              }
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Accordion>
  );
}

export default Click;
