import React, { useState, useEffect } from "react";

// ========================== Main Function  ========================== //
function Timeout({
  item,
  index,
  handleDelete,
  baseUrl,
  scriptItems,
  setScriptItems,
}) {
  const [seconds, setSeconds] = useState(0);
  const [actions, setActions] = useState([]);

  const handleInputChange = (e, setState) => {
    setState(e.target.value); // Update the specific state
    const scriptItemsCopy = [...scriptItems];
    const [currentItem] = scriptItemsCopy.splice(index, 1);
    currentItem.actions = [{ seconds: e.target.value, step: 1 }];
    scriptItemsCopy.splice(index, 0, currentItem);
    setScriptItems(scriptItemsCopy);
  };

  useEffect(() => {
    if (item) {
      setSeconds(item.actions[0]?.seconds);
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <div>
        <p style={{ fontWeight: "400" }}>
          <span
            className={`item-step ${item.type}`}
            style={{ fontWeight: "500" }}
          >
            Step {index + 1}
          </span>
          Set Timeout
        </p>
      </div>
      <div className="script-item">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Seconds:
          <input
            type="text"
            placeholder="Set..."
            className="find-input"
            value={seconds}
            onChange={(e) => handleInputChange(e, setSeconds)}
          />
        </label>
        <div className="button-group">
          <button className="delete-btn" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timeout;
