import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useProduct } from "../../../context/ProductContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import { deleteMatchThunk } from "../../../store/matchReducer";
import "./MatchItem.css";

// Custom Toggle Component
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  const { darkMode } = useDarkMode();
  return (
    <button
      className={`match-list-item-menu ${darkMode ? "dark-mode" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <i
        ref={ref}
        className={`fa-solid fa-ellipsis fa-xs ${darkMode ? "dark-mode" : ""}`}
        style={{ cursor: "pointer" }}
      >
        {children}
      </i>
    </button>
  );
});

const MatchItem = ({ match }) => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { excludedMatchIds, setExcludedMatchIds } = useProduct();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteMatchThunk(match.id))
  };

  return (
    <>
      <div className="match-list-item">
        <div className="match-list-item-left">
          <div className="match-list-item-image">
            <img alt={match.name} src={match.imgSrc} />
          </div>
        </div>
        <div className="match-list-item-right">
          <Dropdown>
            <Dropdown.Toggle
              as={CustomToggle}
              id="dropdown-custom-components"
            />

            <Dropdown.Menu>
              <Dropdown.Item href={match.url} target="_blank" rel="noreferrer">
                View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => handleDelete(e)}>
                Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <p>{match.name}</p>
          <p>${match.price.toFixed(2)}</p>
        </div>
      </div>
      <hr style={{ margin: "0" }} />
    </>
  );
};

export default MatchItem;
