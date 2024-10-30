import React, { createContext, useContext, useState, useEffect } from "react";
import actions from "./data/actions";
import script from "./data/script";
import columns from "./data/columns";

export const ColumnContext = createContext();
export const useColumn = () => useContext(ColumnContext);

export default function ColumnProvider({ children }) {
  const [columns, setColumn] = useState(columns);

  useEffect(() => {
    
  })

  return (
    <ColumnContext.Provider value={{ columns, setColumn }}>
      {children}
    </ColumnContext.Provider>
  );
}
