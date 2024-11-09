import React, { createContext, useContext, useState } from "react";

export const ScriptContext = createContext();
export const useScript = () => useContext(ScriptContext);

export default function ScriptProvider({ children }) {
  const [script, setScript] = useState([]);
  const [scriptItems, setScriptItems] = useState([]);

  const shiftScriptItems = (scriptItems, sourceIndex, destinationIndex) => {
    let startIndex;
    let endIndex;
    let count;

    if (sourceIndex < destinationIndex) {
      console.log("DRAGGED AN ITEM DOWN");
      startIndex = sourceIndex;
      endIndex = destinationIndex - 1;
      count = startIndex + 1;
    } else {
      console.log("DRAGGED AN ITEM UP");
      startIndex = destinationIndex + 1;
      endIndex = sourceIndex;
      count = startIndex + 1;
    }
    // console.log("🖥️  sourceIndex: ", sourceIndex);
    // console.log("🖥️  destinationIndex: ", destinationIndex);
    // console.log("🖥️  startIndex: ", startIndex);
    // console.log("🖥️  endIndex: ", endIndex);

    while (startIndex <= endIndex) {
      console.log("count ===> ", count);
      const item = scriptItems[startIndex];
      item.step = count;
      count++;
      startIndex++;
    }
  };

  return (
    <ScriptContext.Provider
      value={{
        script,
        setScript,
        scriptItems,
        setScriptItems,
        shiftScriptItems,
      }}
    >
      {children}
    </ScriptContext.Provider>
  );
}
