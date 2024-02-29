// import { useSelector } from "react-redux";
import { useProduct } from "../../context/ProductContext";
import SearchBar from "../SearchBar";
import ProductDetails from "../Products/ProductDetails";
import "./Dashboard.css";

function Dashboard() {
  // const product = useSelector((state) => state.products);
  const { currentId } = useProduct();
  console.log(
    "🖥️  >> file: index.js:10 >> Dashboard >> currentId: ",
    currentId
  );

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
