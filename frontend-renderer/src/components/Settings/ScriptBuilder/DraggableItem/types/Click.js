import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

// ========================== Helper Functions  ========================== //
const getText = (type) => {
  switch (type) {
    case "locatorClick":
      return {
        main: "Click on Element",
        sub: "Click on an item based off css attribute",
      };
    case "coordinateClick":
      return {
        main: "Click on Position",
        sub: "Click on an item off coordinates",
      };
    default:
      return { main: "", sub: "" };
  }
};

// ========================== Main Function  ========================== //
function Click({ item, index, handleDelete, scriptUrl }) {
  // Set up state for the input value
  const type = item.type;
  const [inputValue, setInputValue] = useState(item.locator || "");
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [y1, setY1] = useState("");
  const [y2, setY2] = useState("");

  // Destructure text based on item type
  const { main: mainText, sub: subText } = getText(item.type);

  const handleClick = async (e) => {
    if (item.type === "coordinateClick") {
      const res = await window.api.script.getCoordinates(scriptUrl);
      setX1(coordinates.x1);
      setX2(coordinates.x2);
      setY1(coordinates.y1);
      setY2(coordinates.y2);
    }

    if (item.type === "coordinateClick") {
      const res = await window.api.script.getLocators(scriptUrl);
      console.log("🖥️  res for clickElement: ", res);
    }
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
      <Accordion.Item eventKey={index.toString()}>
        <Accordion.Header>
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
              <button className="delete-btn" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="script-items">
            {item.actions?.map((action, actionIndex) => {
              const { main: actionMain, sub: actionSub } = getText(action.type);
              return (
                <div className="script-sub-items" key={`action-${actionIndex}`}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <p style={{ fontWeight: "500" }}>
                      Step {index + 1}.{actionIndex + 1}: {actionMain}
                    </p>
                    <p className="item-subtext">Potato</p>
                  </div>
                  {type === "clickOnPosition" && (
                    <>
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
                          className="find-input"
                          value={action.x1 || ""}
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
                          className="find-input"
                          value={action.x2 || ""}
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
                          className="find-input"
                          value={action.y1 || ""}
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
                          className="find-input"
                          value={action.y2 || ""}
                          onChange={(e) =>
                            handleInputChange(e, (val) => {
                              action.y2 = val;
                              setScriptItems([...scriptItems]);
                            })
                          }
                        />
                      </label>
                    </>
                  )}
                  {type === "clickOnElement" && (
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      locator:
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
                  )}
                </div>
              );
            })}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Click;
