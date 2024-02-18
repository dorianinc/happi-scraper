import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductThunk } from "../../store/products";
import "./SearchBar.css";

const SearchBar = () => {
  const [productName, setProductName] = useState("");
  const [buttonClass, setButtonClass] = useState("search-button disabled");
  const dispatch = useDispatch();


  useEffect(() => {
    console.log("product name in useEffect: ", productName)
    if (productName.length <= 0) {
      setButtonClass("search-button");
    } else {
      setButtonClass("search-button disabled");
    }
  }, [productName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("product name in handleSubmit => ", productName)
    console.log("dispatching addProductThunk")
    await dispatch(addProductThunk({name: productName}));
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          type="submit"
          className={buttonClass}
          onClick={(e) => handleSubmit(e)}
          // disabled={buttonClass.includes("disabled")}
        >
          <i
            class="fa-solid fa-magnifying-glass fa-lg"
            style={{ color: "#0e1b4d" }}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
