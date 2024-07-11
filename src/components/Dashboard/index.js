import React from "react";
import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import ProductDetails from "../Products/ProductDetails";
import SearchBar from "../SearchBar";
import Spinner from "react-bootstrap/Spinner";
import "./Dashboard.css";
import { getSettings } from "../../firestore/api/settings";

function Dashboard() {
  const { currentId } = useProduct();
  const { darkMode } = useDarkMode();
  const { searching, message } = useGeneral();

  const test = async () => {
    const butter = await getSettings();
    console.log("🖥️  butter: ", butter);
  };

  test();

  return (
    <div className="dashboard-container">
      {/* <SearchBar />
      <div className="inner-content">
        <div className="centered-div">
          {searching ? (
            <div id="search-spinner">
            <Spinner animation="border" variant="secondary" />
            <p>This could take a minute, please wait...</p>
            </div>
          ) : !currentId ? (
            <p
              id="no-product-message"
              className={`${darkMode ? "dark-mode" : "light-mode"}`}
            >
              {message}
              <span>
                <img alt="boxes" src="../public/images/happi-supply-boxes.png" />

              </span>
            </p>
          ) : (
            <ProductDetails />
          )}
        </div>
      </div> */}
      <h1>*** UNDER CONSTRUCTION ***</h1>
    </div>
  );
}

export default Dashboard;
