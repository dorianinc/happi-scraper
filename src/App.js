import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import { useDarkMode } from "./context/DarkModeContext";
import Settings from "./components/Settings";

function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/history/products/:productId" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
