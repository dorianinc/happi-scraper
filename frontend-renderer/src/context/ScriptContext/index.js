import React, { createContext, useContext, useState } from "react";

export const ScriptContext = createContext();
export const useScript = () => useContext(ScriptContext);

export default function ScriptProvider({ children }) {
  const [testQuery, setTestQuery] = useState("");
  const [script, setScript] = useState({});
  const [scriptItems, setScriptItems] = useState([]);

  const shiftScriptItems = (scriptItems, sourceIndex, destinationIndex) => {
    let startIndex;
    let endIndex;
    let count;

    if (sourceIndex < destinationIndex) {
      startIndex = sourceIndex;
      endIndex = destinationIndex - 1;
      count = startIndex + 1;
    } else {
      startIndex = destinationIndex + 1;
      endIndex = sourceIndex;
      count = startIndex + 1;
    }

    while (startIndex <= endIndex) {
      const item = scriptItems[startIndex];
      item.step = count;
      count++;
      startIndex++;
    }
  };

  return (
    <ScriptContext.Provider
      value={{
        testQuery,
        setTestQuery,
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
