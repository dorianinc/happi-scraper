import React, { createContext, useContext, useState, useEffect } from "react";
import { getSettingsThunk } from "../../store/settingsReducer";
import { useDispatch } from "react-redux";

export const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export default function DarkModeProvider({ children }) {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    dispatch(getSettingsThunk()).then((settings) => {
      const isDarkMode = settings.darkMode;
      setDarkMode(isDarkMode || false)
    });
  }, [dispatch, darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
