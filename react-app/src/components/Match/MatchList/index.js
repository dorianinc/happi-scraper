import { useState } from "react";
import MatchItem from "../MatchItem";
import "./MatchList.css";

const MatchList = ({ siteName, matches }) => {
  const [selected, setSelected] = useState([]);

  const handleClick = (nameOfSite) => {
    let newSelected;
    if (!selected.includes(nameOfSite)) {
      newSelected = [...selected, nameOfSite];
    } else {
      newSelected = selected.filter((site) => site !== nameOfSite);
    }
    setSelected(newSelected);
  };

  if (!matches.length) return null;
  return (
    <div className="match-list-container">
      <h2 className="match-list-header" onClick={() => handleClick(siteName)}>
        <p>
          {siteName} || Matches({matches.length})
        </p>
        {selected.includes(siteName) ? (
          <i class="fa-solid fa-caret-up" />
        ) : (
          <i className="fa-solid fa-caret-down" />
        )}
      </h2>
      <ul className="match-list" hidden={!selected.includes(siteName)}>
        {matches.map((match) => (
          <MatchItem match={match} />
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
