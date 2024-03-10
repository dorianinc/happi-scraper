import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  addProductThunk,
  getSingleProductThunk,
} from "../../store/productsReducer";
import "./SearchBar.css";

const SearchBar = () => {
  const { setCurrentId } = useProduct();
  const { darkMode } = useDarkMode();
  const { searching, setSearching, setMessage } = useGeneral();

  const [productName, setProductName] = useState(
    "Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)"
  );
  const [buttonClass, setButtonClass] = useState("search-button disabled");
  const dispatch = useDispatch();

  useEffect(() => {
    if (productName.length <= 0) {
      setButtonClass("search-button");
    } else {
      setButtonClass("search-button disabled");
    }
  }, [productName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="searchbar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className={`search-input ${darkMode ? "dark-mode" : "light-mode"}`}
          value={productName}
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
