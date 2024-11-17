import React from "react";
import { useProduct } from "../../../context/ProductContext";
import "./MatchItem.css";

const MatchItem = ({ match }) => {
  const { excludedMatchIds, setExcludedMatchIds } = useProduct();

  const handleChange = (value) => {
    if (!excludedMatchIds.includes(value)) {
      const excluded = [...excludedMatchIds, value];
      setExcludedMatchIds(excluded);
    } else {
      const excluded = excludedMatchIds.filter((id) => id !== value);
      setExcludedMatchIds(excluded);
    }
  };

  return (
    <>
      <div className="match-list-item">
        <div className="match-list-item-left">
          <input
            className="match-list-item-checkbox"
            type="checkbox"
            value={match.id}
            checked={!excludedMatchIds.includes(Number(match.id))}
            onChange={(e) => handleChange(Number(e.target.value))}
          />
          <div className="match-list-item-image">
            <img alt={match.name} src={match.imgSrc} />
          </div>
        </div>
        <div className="match-list-item-right">
          <a
            className="match-list-item-link"
            href={match.url}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-up-right-from-square" />
          </a>
          <p>{match.name}</p>
          <p>${match.price.toFixed(2)}</p>
        </div>
      </div>
      <hr style={{ margin: "0" }} />
    </>
  );
};

export default MatchItem;
