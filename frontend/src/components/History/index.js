import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../store/productsReducer";
import { usePagination } from "../../context/PaginationContext";
import { useDarkMode } from "../../context/DarkModeContext";
import HistoryPagination from "./Pagination";
import ProductItem from "../Products/ProductItem";
import SearchBar from "../SearchBar";
import "./History.css";

function History() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { page, limit, setNumOfPages } = usePagination();
  const getProducts = useSelector((state) => state.products);
  const products = getProducts.items;
  const count = getProducts.count;

  useEffect(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (count) {
      setNumOfPages(Math.ceil(count / limit));
    }
  }, [count, limit]);

  if (!products) return null;
  return (
    <div className="history-container">
      <SearchBar />
      <div className="inner-content">
        <h1
          className={`header-tag ${darkMode ? "dark-mode" : "light-mode"}`}
          style={{ padding: "2px" }}
        >
          History
        </h1>
        <hr className={`line ${darkMode ? "dark-mode" : "light-mode"}`}/>
        {products.length ? (
          <>
            <div className="cards-container">
              {products.map((product, i) => (
                <ProductItem key={i} product={product} />
              ))}
            </div>
            <div className="pagination-container">
              <HistoryPagination />
            </div>
          </>
        ) : (
          <div className="centered-div">
            <p
              className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}
              id="no-product-message"
            >
              Start fresh, no history!
              <span>
                <img alt="boxes" src="/images/happi-supply-boxes.png" />
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
