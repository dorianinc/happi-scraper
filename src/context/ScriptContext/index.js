import React, { createContext, useContext, useState, useEffect } from "react";

export const ScriptContext = createContext();
export const useScript = () => useContext(ScriptContext);

export default function ScriptProvider({ children }) {
  const [script, setScript] = useState([]);
  const [scriptItems, setScriptItems] = useState([]);

  useEffect(() => {});

  return (
    <ScriptContext.Provider
      value={{ script, setScript, scriptItems, setScriptItems }}
    >
      {children}
    </ScriptContext.Provider>
  );
}
