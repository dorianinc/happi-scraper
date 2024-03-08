import { createContext, useContext, useState } from "react";

export const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);

export default function SettingsProvider({ children }) {
  const [lightMode, setLightMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  const [selectHighest, setSelectHighest] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        lightMode,
        setLightMode,
        darkMode,
        setDarkMode,
        similarityThreshold,
        setSimilarityThreshold,
        selectHighest,
        setSelectHighest,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
