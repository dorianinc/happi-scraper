import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="menu-items">
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <button>
              <i className="fa-solid fa-house fa-xl" style={{ color: "#ffffff" }} />
            </button>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/history" className="menu-link">
            <button>
              <i className="fa-solid fa-clock-rotate-left fa-xl" style={{ color: "#ffffff" }} />
            </button>
          </Link>
        </li>
        <li className="menu-item last-item">
          <Link to="/settings" className="menu-link">
            <button>
              <i className="fa-solid fa-gear fa-xl" style={{ color: "#ffffff" }} />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
