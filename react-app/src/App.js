import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="app-container">
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
