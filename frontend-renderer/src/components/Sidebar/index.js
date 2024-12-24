import React from "react";
import { Link } from "react-router-dom";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import "./Sidebar.css";

function Sidebar() {
  const { darkMode } = useDarkMode();
  const { activeLink, setActiveLink, searching } = useGeneral();

  return (
    <div className={`side-bar ${darkMode ? "dark-mode" : ""}`}>
      <div className="logo-container">
        <img
          className="logo"
          alt="logo"
          src={
            darkMode
              ? "../public/images/happi-supply-owl-dark.png"
              : "../public/images/happi-supply-owl.png"
          }
        />
      </div>
      <ul className="menu-items">
        <li
          className={`menu-item ${activeLink === 1 ? "active" : ""}  ${
            darkMode ? "dark-mode" : ""
          }`}
          onClick={() => setActiveLink(1)}
        >
          <Link to="/" className="menu-link">
            <button className="link-button" disabled={searching}>
              <i className="fa-solid fa-house fa-2xl" />
            </button>
          </Link>
        </li>
        <li
          className={`menu-item ${activeLink === 2 ? "active" : ""}  ${
            darkMode ? "dark-mode" : ""
          }`}
          onClick={() => setActiveLink(2)}
        >
          <Link to="/history" className="menu-link">
            <button className="link-button" disabled={searching}>
              <i className="fa-solid fa-clock-rotate-left fa-2xl" />
            </button>
          </Link>
        </li>
        <li
          className={`menu-item ${activeLink === 3 ? "active" : ""}  ${
            darkMode ? "dark-mode" : ""
          } last-item`}
          onClick={() => setActiveLink(3)}
        >
          <Link to="/settings" className="menu-link">
            <button className="link-button" disabled={searching}>
              <i className="fa-solid fa-gear fa-2xl" />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
