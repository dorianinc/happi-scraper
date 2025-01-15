import React from "react";
import { useDispatch } from "react-redux";
import { useDarkMode } from "../../../context/DarkModeContext";
import { deleteMatchThunk } from "../../../store/matchReducer";
import { deleteProductThunk } from "../../../store/productsReducer";
import { Dropdown } from "react-bootstrap";
import "./MatchItem.css";

// Custom Toggle Component
const AccordionClick = React.forwardRef(({ children, onClick }, ref) => {
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

const MatchItem = ({ match, numOfMatches }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (numOfMatches > 1) {
      await dispatch(deleteMatchThunk(match.id));
    } else {
      await dispatch(deleteProductThunk(match.productId));
    }
  };

  return (
    <>
      <div className="match-list-item">
        <div className="match-list-item-left">
          <div className="match-list-item-image">
            <img
              alt={match.name}
              src={match.imgSrc || "../../../public/images/placeholder.jpg"}
            />
          </div>
        </div>
        <div className="match-list-item-right">
          <Dropdown>
            <Dropdown.Toggle
              as={AccordionClick}
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
