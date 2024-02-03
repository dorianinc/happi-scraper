import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-container">
      <img className ="logo" alt="logo"  src="/images/happi-supply-owl1.png"/>
      </div>
      <ul className="menu-items">
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <button>
              <i className="fa-solid fa-house fa-2xl" style={{ color: "#ffffff" }} />
            </button>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/history" className="menu-link">
            <button>
              <i className="fa-solid fa-clock-rotate-left fa-2xl" style={{ color: "#ffffff" }} />
            </button>
          </Link>
        </li>
        <li className="menu-item last-item">
          <Link to="/settings" className="menu-link">
            <button>
              <i className="fa-solid fa-gear fa-2xl" style={{ color: "#ffffff" }} />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
