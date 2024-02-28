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
      <div className="match-list-header" onClick={() => handleClick(siteName)}>
        <h2>{siteName}<span style={{margin: "3px", fontSize:"15px"}}>({matches.length})</span></h2>
        {selected.includes(siteName) ? (
          <i class="fa-solid fa-caret-up fa-lg" />
        ) : (
          <i className="fa-solid fa-caret-down fa-lg" />
        )}
      </div>
      <ul className="match-list-content" hidden={!selected.includes(siteName)}>
        {matches.map((match) => (
          <MatchItem match={match} />
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
