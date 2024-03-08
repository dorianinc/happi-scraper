import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import ProductDetails from "../Products/ProductDetails";
import SearchBar from "../SearchBar";
import Spinner from "react-bootstrap/Spinner";
import "./Dashboard.css";

function Dashboard() {
  const { currentId  } = useProduct();
  const {searching, message} = useGeneral()

  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">
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
