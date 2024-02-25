import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/productsReducer";
import SearchBar from "../SearchBar";
import "./History.css";

function History() {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products);
  const products = Object.values(getProducts);
  console.log("🚀 ~ History ~ products:", products)

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">History</div>
    </div>
  );
}

export default History;
