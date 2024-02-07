import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Settings from "./components/Settings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const obj = {
    product: {
      name: "cool item",
      img_src: "cool image",
      websites: [
        {
          site_name: "randomsite1",
          product_name: "potato",
          img_src: "test1",
          price: "50",
          url: "google.come",
        },
        {
          site_name: "randomsite2",
          product_name: "potato",
          img_src: "test1",
          price: "50",
          url: "google.come",
        },
        {
          site_name: "randomsite3",
          product_name: "potato",
          img_src: "test1",
          price: "50",
          url: "google.come",
        },
        {
          site_name: "randomsite4",
          product_name: "potato",
          img_src: "test1",
          price: "50",
          url: "google.come",
        },
        {
          site_name: "randomsite5",
          product_name: "potato",
          img_src: "test1",
          price: "50",
          url: "google.come",
        },
      ],
    },
  };
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Sidebar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <div className="main-content">
            <Route path="/history">
              <History />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </div>
        </Switch>
      )}
    </div>
  );
}

export default App;
