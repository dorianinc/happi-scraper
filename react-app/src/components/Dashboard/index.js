import { useLocation, useHistory } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import ProductDetails from "../Products/ProductDetails";
import SearchBar from "../SearchBar";
import Spinner from "react-bootstrap/Spinner";
import "./Dashboard.css";

function Dashboard() {
  const { currentId  } = useProduct();
  const {searching, message} = useGeneral()
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
          {searching ? (
            <Spinner animation="border" variant="secondary"/>
          ) : !currentId ? (
            <p id="no-product-message">
              {message}
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
