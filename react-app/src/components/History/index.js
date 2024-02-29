import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/productsReducer";
import Pagination from "react-bootstrap/Pagination";
import ProductItem from "../Products/ProductItem";
import SearchBar from "../SearchBar";
import "./History.css";

function History() {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products);
  const products = Object.values(getProducts);
  console.log("🖥️  >> file: index.js:12 >> History >> products : ", products);

  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  if (!products.length) return null;
  return (
    <div className="history-container">
      <SearchBar />
      <div className="inner-content">
        <div className="cards-container">
          {products.map((product, i) => (
            <ProductItem key={i} product={product} />
          ))}
        </div>
        <div className="pagination-container">
          <Pagination size="lg">{items}</Pagination>
        </div>
      </div>
    </div>
  );
}

export default History;
