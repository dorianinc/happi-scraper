import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import { useDarkMode } from "./context/DarkModeContext";
import Settings from "./components/Settings";

function App() {
  const {darkMode} = useDarkMode()
  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Sidebar />
      <Switch>
        <div className="main-content">
          <Route exact path="/history/products/:productId">
            <Dashboard />
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </div>
      </Switch>
    </div>
  );
}

export default App;
