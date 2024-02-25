import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import "./MatchList.css";

const MatchList = ({ matches }) => {
    console.log("🖥️  >> file: index.js:6 >> MatchList >>  matches : ",  matches )
    
    if (!!matches.length) return null;
    console.log("🖥️  >> file: index.js:6 >> MatchList >> !!matches.length: ", !!matches.length);
    console.log("🖥️  >> file: index.js:6 >> MatchList >> matches: ", matches)
  return (
    <div className="match-list-container">
        {/* <h2>{matches[0].name}</h2>
        <h3>{matches[0].length}</h3> */}
    </div>
  );
};

export default MatchList;
