import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../store/productsReducer";
import { usePagination } from "../../context/PaginationContext";
import HistoryPagination from "./Pagination";
import ProductItem from "../Products/ProductItem";
import SearchBar from "../SearchBar";
import "./History.css";

function History() {
  const dispatch = useDispatch();
  const { page, limit, setNumOfPages } = usePagination();
  const getProducts = useSelector((state) => state.products);
  const products = getProducts.items;
  const count = getProducts.count;

  useEffect(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page]);

  useEffect(() => {
    if (count) {
      setNumOfPages(Math.ceil(count / limit));
    }
  }, [count]);

  if (!products) return null;
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
