import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProduct } from "../../context/ProductContext";
import {
  addProductThunk,
  getSingleProductThunk,
} from "../../store/productsReducer";
import "./SearchBar.css";

const SearchBar = () => {
  const { setCurrentId } = useProduct();
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
    const response = await dispatch(addProductThunk({ name: productName }));
    const product = await dispatch(getSingleProductThunk(response.id));

    if (product.id) {
      setCurrentId(product.id);
    }
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
          <i class="fa-solid fa-magnifying-glass fa-lg" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
