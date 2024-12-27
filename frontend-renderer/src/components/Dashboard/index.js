import React from "react";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import ProductDetails from "../Products/ProductDetails";

import Spinner from "react-bootstrap/Spinner";
import "./Dashboard.css";

function Dashboard() {
  const { darkMode } = useDarkMode();
  const { searching } = useGeneral();

  return (
    <>
      {searching ? (
        <div className="message-container">
          <div id="search-spinner">
            <Spinner animation="border" variant="secondary" />
            <p id="search-message" className={`${darkMode ? "dark-mode" : ""}`}>
              This could take a minute, please wait...
            </p>
          </div>
        </div>
      ) : (
        <ProductDetails />
      )}
    </>
  );
}

export default Dashboard;
