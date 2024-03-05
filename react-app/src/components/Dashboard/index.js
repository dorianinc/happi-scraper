import { useLocation, useHistory } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import ProductDetails from "../Products/ProductDetails";
import SearchBar from "../SearchBar";
import "./Dashboard.css";

function Dashboard() {
  const { currentId } = useProduct();
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const fromHistory = () => {
    if (!currentId) return false;
    return pathName.startsWith("/history");
  };

  const closeDash = () => {
    history.push(`/history`);
  };

  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">
        {/* {fromHistory() && (
          <div className="close-button" onClick={() => closeDash()}>
            <i class="fa-solid fa-arrow-left-long fa-2xl" />
            <p>Back</p>
          </div>
        )} */}
        <div className="centered-div">
          {!currentId ? (
            <p id="no-product-message">
              [Search for a product to see something here]
              <span>
                <img alt="boxes" src="/images/happi-supply-boxes.png" />
              </span>
            </p>
          ) : (
            <ProductDetails />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
