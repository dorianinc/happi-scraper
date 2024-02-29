import { useProduct } from "../../context/ProductContext";
import SearchBar from "../SearchBar";
import ProductDetails from "../Products/ProductDetails";
import "./Dashboard.css";

function Dashboard() {
  const { currentId } = useProduct();
  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">
        <div className="centered-div">
          {!currentId ? (
            <p id="no-product-message">
              [Search for a product to see something here]
              <span>
                <img
                  alt="boxes"
                  src="/images/happi-supply-boxes.png"
                />
              </span>
            </p>
          ) : (
            <ProductDetails />
            // <ProductDetails product={product} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
