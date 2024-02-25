import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import ProductItem from "../Products/ProductItem";
import "./Dashboard.css";

function Dashboard() {
  const product = useSelector((state) => state.products);
  // console.log(
  //   "🖥️  >> file: index.js:5 >> ProductDetails >> product: ",
  //   Object.values(product).length
  // );

  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">
        <div className="centered-div">
          {/* <p id="message">
            [Search for a product to see something here]
            <span>
              <div className="boxes-container">
                <img
                  className="boxes"
                  alt="boxes"
                  src="/images/happi-supply-boxes.png"
                />
              </div>
            </span>
          </p> */}
          <ProductItem product={product} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
