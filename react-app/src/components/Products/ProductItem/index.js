import { useHistory } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const {darkMode} = useDarkMode();
  const { setCurrentId } = useProduct();
  const history = useHistory();
  if (!product) return null;

  const handleClick = (e) => {
    e.preventDefault();

    setCurrentId(product.id);
    history.push(`/history/products/${product.id}`);
  };

  return (
    <div className="product-item-card" onClick={(e) => handleClick(e)}>
      <img
        style={{ height: "100px", width: "200px" }}
        alt={product.id}
        src={product.img_src}
      />
      <div className="product-card-body">
        <p className={`header-tag ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ fontSize: ".9em", fontWeight: "600" }}>{product.name}</p>
        <p className={`header-tag ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ fontWeight: "400" }}>average price: ${product.avg_price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductItem;
