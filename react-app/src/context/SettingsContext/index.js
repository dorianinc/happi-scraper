import { createContext, useContext, useState, useEffect } from "react";

export const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);

export default function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [selectAll, setSelectAll] = useState(true);
  const [selectHighest, setSelectHighest] = useState(true);



  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        similarityThreshold,
        setSimilarityThreshold,
        selectAll,
        setSelectAll,
        selectHighest,
        setSelectHighest,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
