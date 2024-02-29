import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import "./MatchItem.css";

const MatchItem = ({ match }) => {
  const { excludedMatchIds, setExcludedMatchIds } = useProduct();

  const handleClick = (value) => {
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
            onClick={(e) => handleClick(Number(e.target.value))}
          />
          <div className="match-list-item-image">
            <img alt={match.name} src={match.img_src} />
          </div>
        </div>
        <div className="match-list-item-right">
          <a
            className="match-list-item-link"
            href={match.url}
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-solid fa-up-right-from-square" />
          </a>
          <p>{match.name}</p>
          <p>${match.price}</p>
        </div>
      </div>
      <hr style={{ margin: "0" }} />
    </>
  );
};

export default MatchItem;
