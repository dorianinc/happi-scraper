import { Link } from "react-router-dom";
import { useGeneral } from "../../context/GeneralContext";
import "./Sidebar.css";

function Sidebar() {
  const { activeLink, setActiveLink, searching } = useGeneral();

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img className="logo" alt="logo" src="/images/happi-supply-owl1.png" />
      </div>
      <ul className="menu-items">
        <li
          className={`menu-item ${activeLink === 1 ? "active" : ""}`}
          onClick={() => setActiveLink(1)}
        >
          <Link to="/" className="menu-link">
            <button className="link-button" disabled={searching}>
              <i
                className="fa-solid fa-house fa-2xl"
                style={{ color: "#ffffff" }}
              />
            </button>
          </Link>
        </li>
        <li
          className={`menu-item ${activeLink === 2 ? "active" : ""}`}
          onClick={() => setActiveLink(2)}
        >
          <Link to="/history" className="menu-link">
            <button className="link-button" disabled={searching}>
              <i
                className="fa-solid fa-clock-rotate-left fa-2xl"
                style={{ color: "#ffffff" }}
              />
            </button>
          </Link>
        </li>
        <li
          className={`menu-item ${activeLink === 3 ? "active" : ""} last-item`}
          onClick={() => setActiveLink(3)}
        >
          <Link to="/settings" className="menu-link">
            <button className="link-button" disabled={searching}>
              <i
                className="fa-solid fa-gear fa-2xl"
                style={{ color: "#ffffff" }}
              />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
