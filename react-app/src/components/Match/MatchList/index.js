import React from "react";
import MatchItem from "../MatchItem";
import Accordion from "react-bootstrap/Accordion";
import "./MatchList.css";

const MatchList = ({ siteName, matches }) => {
  const wordToNumber = (word) => {
    let result = "";
    for (let i = 0; i < word.length; i++) {
      result += word.charCodeAt(i);
    }
    return parseInt(result);
  };

  if (!matches.length) return null;
  return (
    <Accordion.Item eventKey={wordToNumber(siteName)}>
      <Accordion.Header>
        <h2 className="match-list-header">
          {siteName}
          <span style={{ margin: "3px", fontSize: "15px" }}>
            ({matches.length})
          </span>
        </h2>
      </Accordion.Header>
      <Accordion.Body>
          {matches.map((match) => (
            <MatchItem match={match} />
          ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MatchList;
