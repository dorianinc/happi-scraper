import { createContext, useContext, useState, useEffect } from "react";
import { getDarkModeThunk } from "../../store/settingsReducer";
import { useDispatch } from "react-redux";

export const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export default function DarkModeProvider({ children }) {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    dispatch(getDarkModeThunk()).then((darkMode) => {
      console.log("🖥️  darkMode: ", darkMode);

      if (darkMode) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    });
  }, [dispatch, darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
