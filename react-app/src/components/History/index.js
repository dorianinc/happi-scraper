import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/productsReducer";
import Pagination from "react-bootstrap/Pagination";
import HistoryPagination from "./Pagination";
import ProductItem from "../Products/ProductItem";
import SearchBar from "../SearchBar";
import "./History.css";

function History() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9)
  const products = useSelector((state) => Object.values(state.products));

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
    dispatch(getProductsThunk({page, limit}));
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
          <HistoryPagination />
        </div>
      </div>
    </div>
  );
}

export default History;
