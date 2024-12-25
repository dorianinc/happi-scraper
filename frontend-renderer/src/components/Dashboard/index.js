import React from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../../context/ProductContext";
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
  console.log("🖥️  product in dashboard: ", product);
  console.log("path ===> ", location.pathname);

  return (
    <div className="dashboard-container">
      <div className="inner-content">
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
          ) : (currentPath.startsWith("/product") || product.currentProduct) ? (
            <ProductDetails />
          ) : (
            <p
              id="no-product-message"
              className={`${darkMode ? "dark-mode" : ""}`}
            >
              {message}
              <span>
                <img
                  alt="boxes"
                  src="../public/images/happi-supply-boxes.png"
                />
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
