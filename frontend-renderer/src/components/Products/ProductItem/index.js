import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext";
import { deleteProductThunk } from "../../../store/productsReducer";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const { darkMode } = useDarkMode();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/products/${product.id}`);
  };
  
  const handleDelete = async (e) => {
    e.stopPropagation();
    await dispatch(deleteProductThunk(product.id));
  };
  
  if (!product) return null;
  return (
    <div
      className={`product-item-card ${darkMode ? "dark-mode" : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <div className="delete-icon" onClick={(e) => handleDelete(e)}>
        <i className="fa-regular fa-trash-can fa-sm"></i>
      </div>
      <div className="product-item-image">
        <img
          alt={product.id}
          src={product.imgSrc || "../public/images/placeholder.jpg"}
        />
      </div>
      <div className="product-card-body">
        <p
          className={`header-tag ${darkMode ? "dark-mode" : ""}`}
          style={{ fontSize: ".9em", fontWeight: "600" }}
        >
          {product.name}
        </p>
        <p
          className={`header-tag ${darkMode ? "dark-mode" : ""}`}
          style={{ fontWeight: "400" }}
        >
          average price: $
          {product.avgPrice ? product.avgPrice.toFixed(2) : "undefined"}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
