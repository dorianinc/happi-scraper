import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk, getCountThunk } from "../../store/productsReducer";
import { usePagination } from "../../context/PaginationContext";
import HistoryPagination from "./Pagination";
import ProductItem from "../Products/ProductItem";
import SearchBar from "../SearchBar";
import "./History.css";

function History() {
  const dispatch = useDispatch();
  const { page, limit, setNumOfPages } = usePagination();
  const products = useSelector((state) => Object.values(state.products));
  console.log("🖥️  >> file: index.js:14 >> History >> products: ", products)

  // useEffect(() => {
  //  const count = dispatch(getCountThunk())
  //  console.log("🖥️  >> file: index.js:18 >> useEffect >> count : ", count )
  // }, [])
  useEffect(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page]);
  
  useEffect(() => {
    if (products.length) {
      console.log("🖥️  >> file: index.js:23 >> useEffect >> products.length: ", products.length)
      setNumOfPages(Math.ceil(products.length / limit));
    }
  }, [products]);
  

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
