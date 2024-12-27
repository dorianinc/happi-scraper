import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePagination } from "../../context/PaginationContext";
import { useDarkMode } from "../../context/DarkModeContext";
import { getProductsThunk } from "../../store/productsReducer";
import HistoryPagination from "./Pagination";
import ProductItem from "../Products/ProductItem";
import "./History.css";

function History() {
  const { darkMode } = useDarkMode();
  const { page, setPage, size, setNumOfPages } = usePagination();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const count = useSelector((state) => state.products.count);

  useEffect(() => {
    if (count >= 1) {
      setNumOfPages(Math.ceil(count / size));
    } else {
      // if (page > 1) {
      //   console.log("banana");
      //   setPage((prev) => prev - 1);
      // }
    }
  }, [count]);

  useEffect(() => {
    dispatch(getProductsThunk({ page, size }));
  }, [page]);

  if (!products) return null;
  return (
    <>
      <h1
        className={`header-tag ${darkMode ? "dark-mode" : ""}`}
        style={{ padding: "2px" }}
      >
        History
      </h1>
      <hr className={`line ${darkMode ? "dark-mode" : ""}`} />
      {count ? (
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
