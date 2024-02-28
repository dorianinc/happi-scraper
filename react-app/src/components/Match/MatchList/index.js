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
        <ul className="match-list-content">
          {matches.map((match) => (
            <MatchItem match={match} />
          ))}
        </ul>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MatchList;

// return (
//   <div className="match-list-container">
//     <div className="match-list-header" onClick={() => handleClick(siteName)}>
//       <h2>
//         {siteName}
//         <span style={{ margin: "3px", fontSize: "15px" }}>
//           ({matches.length})
//         </span>
//       </h2>
//       {selected.includes(siteName) ? (
//         <i class="fa-solid fa-caret-up fa-lg" />
//       ) : (
//         <i className="fa-solid fa-caret-down fa-lg" />
//       )}
//     </div>
//     {/* <Accord/> */}
//     <ul className="match-list-content" hidden={!selected.includes(siteName)}>
//       {matches.map((match) => (
//         <MatchItem match={match} />
//       ))}
//     </ul>
//   </div>
// );
// };
