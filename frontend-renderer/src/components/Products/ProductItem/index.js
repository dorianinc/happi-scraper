import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  
  if (!product) return null;
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className={`product-item-card ${darkMode ? "dark-mode" : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <div className="product-item-image">
        <img alt={product.id} src={product.imgSrc} />
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
