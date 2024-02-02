import React from "react";
import SearchBar from "../SearchBar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="dashboard-content">Random text</div>
    </div>
  );
}

export default Dashboard;
