import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePagination } from "../../context/PaginationContext";
import { useDarkMode } from "../../context/DarkModeContext";
import { getProductsThunk } from "../../store/productsReducer";
import HistoryPagination from "./Pagination";
import ProductItem from "../Products/ProductItem";
import "./History.css";

function History() {
  const dispatch = useDispatch();

  const { darkMode } = useDarkMode();
  const { size, page, setPage, setActive, setNumOfPages } = usePagination();

  const products = useSelector((state) => state.products.allProducts);
  const count = useSelector((state) => state.products.count);

  useEffect(() => {
    setPage(1);
    setActive(1);
  }, []);

  useEffect(() => {
    const numberOfPages = Math.ceil(count / size);
    const currentNumOfProducts = products.length;
    if (count >= 1) {
      setNumOfPages(numberOfPages);
    }
    if (numberOfPages < page) {
      setPage(numberOfPages);
      setActive(numberOfPages);
    }
    if (currentNumOfProducts < 9) {
      dispatch(getProductsThunk({ page, size }));
    }
  }, [count]);

  useEffect(() => {
    dispatch(getProductsThunk({ page, size }));
  }, [page]);

  if (!products) return null;
  return (
    <>
      {count ? (
        <>
          <div className="histroy-cards-container">
            {products.map((product, i) => (
              <ProductItem key={i} product={product} />
            ))}
          </div>
          <div className="pagination-container">
            <HistoryPagination />
          </div>
        </>
      ) : (
        <div className="message-container">
          <p
            className={`p-tag ${darkMode ? "dark-mode" : ""}`}
            id="no-product-message"
          >
            Start fresh, no history!
            <span>
              <img alt="boxes" src="../public/images/happi-supply-boxes.png" />
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default History;
