import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import "./MatchItem.css";

const MatchItem = ({ match }) => {
  console.log("🖥️  >> file: index.js:6 >> MatchItem >> match: ", match);
  return (
    <li className="match-list-item">
      <div className="match-list-item-left">
        <div className="match-list-item-image">
          <img
            style={{ height: "200px", width: "100px" }}
            alt={match.name}
            src={match.img_src}
          />
        </div>
      </div>
      <div className="match-list-item-right">
        <p>{match.name}</p>
        <p>{match.price}</p>
        <a href={match.url} target="_blank">link</a>
      </div>
    </li>
  );
};

export default MatchItem;
