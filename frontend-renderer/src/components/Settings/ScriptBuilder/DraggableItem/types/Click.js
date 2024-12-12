import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

// ========================== Helper Functions  ========================== //
function CustomToggle({ eventKey }) {
  const [opened, setOpened] = useState(false);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setOpened((prevState) => !prevState);
  });

  return (
    <button
      type="button"
      style={{
        backgroundColor: "transparent",
        border: "2px solid black",
        borderRadius: "10px",
        marginLeft: "10px",
      }}
      onClick={decoratedOnClick}
    >
      <i class={`fa-solid fa-chevron-${!opened ? "down" : "up"}`} />
    </button>
  );
}

// ========================== Main Function  ========================== //
function Click({
  item,
  index,
  handleDelete,
  scriptItems,
  setScriptItems,
}) {
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
    const scriptUrl = scriptItems[index - 1].endUrl
    if (item.type === "coordinateClick") {
      actions = await window.api.script.getCoordinates(scriptUrl);
    }
    if (item.type === "locatorClick") {
      actions = await window.api.script.getLocators(scriptUrl, "multi");
    }
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = actions;
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
      <Accordion className={`accordion script`} eventKey={index.toString()}>
        <Card>
          <Card.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
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
                <CustomToggle eventKey={index.toString()}>
                  Click me!
                </CustomToggle>
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
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
                              className="find-input coordinates"
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
                              className="find-input coordinates"
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
                              className="find-input coordinates"
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
                              className="find-input coordinates"
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
                              className="find-input"
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
