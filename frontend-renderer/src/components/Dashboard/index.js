import React from "react";
import { useSelector } from "react-redux";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import ProductDetails from "../Products/ProductDetails";
import { useLocation } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import "./Dashboard.css";

function Dashboard() {
  console.log("in dashboard");
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { searching, message } = useGeneral();
  const product = useSelector((state) => state.products);
  const currentPath = location.pathname;

  return (

      <div className="inner-content" style={{border: "2px solidblue"}}>
        <div className="centered-div">
          {searching ? (
            <div id="search-spinner">
              <Spinner animation="border" variant="secondary" />
              <p
                id="search-message"
                className={`${darkMode ? "dark-mode" : ""}`}
              >
                This could take a minute, please wait...
              </p>
            </div>
          ) : (
            <ProductDetails />
          )}
        </div>
      </div>

  );
}

export default Dashboard;
