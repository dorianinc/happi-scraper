import React from "react";
import MatchItem from "../MatchItem";
import Accordion from "react-bootstrap/Accordion";
import { useDarkMode } from "../../../context/DarkModeContext";
import "./MatchList.css";

const MatchList = ({ siteName, matches }) => {
  const { darkMode } = useDarkMode();
  if (!matches.length) return null;
  return (
    <Accordion.Item eventKey={siteName}>
      <Accordion.Header>
        <h2 className="match-list-header">
          {siteName}
          <span style={{ margin: "3px", fontSize: "15px" }}>
            ({matches.length})
          </span>
        </h2>
      </Accordion.Header>
      <Accordion.Body
      className={`${darkMode ? "dark-mode" : ""}`}
      >
        {matches.map((match, i) => (
          <MatchItem key={i} match={match} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MatchList;
