import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  addProductThunk,
  getSingleProductThunk,
} from "../../store/productsReducer";
import "./SearchBar.css";

const SearchBar = () => {
  const name =
    "Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)";
  const { setCurrentId } = useProduct();
  const { darkMode } = useDarkMode();
  const { searching, setSearching, setMessage } = useGeneral();
  const [productName, setProductName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
    setSearching(true);
    dispatch(addProductThunk({ name: productName })).then((res) => {
      setSearching(false);
      if (res.id) {
        dispatch(getSingleProductThunk(res.id)).then((product) => {
          if (product.id) {
            setCurrentId(product.id);
          }
        });
      } else {
        setMessage(
          "No matches found for your search. Please try again with a different keywords."
        );
      }
    });
  };

  const handleKeyDown = async (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (productName.length > 1) {
        handleSubmit(e);
      }
    }
  };

  return (
    <div
      className={`search-bar-container ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className={`search-input ${darkMode ? "dark-mode" : "light-mode"}`}
          value={productName}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          type="submit"
          className={`search-button ${darkMode ? "dark-mode" : "light-mode"}`}
          onClick={(e) => handleSubmit(e)}
          disabled={searching}
        >
          <i
            className={`fa-solid fa-magnifying-glass fa-lg ${
              darkMode ? "dark-mode" : "light-mode"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
