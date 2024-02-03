import SearchBar from "../SearchBar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">
        <div className="centered-div">
          <p id="message">
            [Search for a product to see something here]
            <span>
              <div className="boxes-container">
                <img className="boxes" alt="boxes" src="/images/happi-supply-boxes.png" />
              </div>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
