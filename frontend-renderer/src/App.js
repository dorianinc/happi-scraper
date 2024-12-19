import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import TopBar from "./components/TopBar";
import ScriptBuilder from "./components/Settings/ScriptBuilder";
import GeneralSettings from "./components/Settings/GeneralSettings";
import { useDarkMode } from "./context/DarkModeContext";
import ScriptProvider from "./context/ScriptContext";

function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <TopBar />
      <div className="main-content">
        <Routes>
          <Route path="/history/products/:productId" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="settings/general" element={<GeneralSettings />} />

          <Route
            path="settings/scriptBuilder"
            element={
              <ScriptProvider>
                <ScriptBuilder />
              </ScriptProvider>
            }
          />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
