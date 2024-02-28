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
        <a className="match-list-item-link" href={match.url} target="_blank" rel="noreferrer">
          <i class="fa-solid fa-up-right-from-square" />
        </a>
        <p>{match.name}</p>
        <p>${match.price}</p>
      </div>
    </li>
  );
};

export default MatchItem;


