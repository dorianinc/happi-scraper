import SearchBar from "../SearchBar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="inner-content">Dash</div>
    </div>
  );
}

export default Dashboard;
