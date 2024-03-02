import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import MatchList from "../../Match/MatchList";
import Accordion from "react-bootstrap/Accordion";
import "./ProductDetails.css";

const ProductDetails = () => {
  const {
    currentId,
    currentAvgPrice,
    setCurrentAvgPrice,
    currentName,
    currentimgSrc,
    currentMatches,
    excludedMatchIds,
  } = useProduct();

  
  const calculateAverage = (matches) => {
    let sum = 0;
    for (let i = 0; i < matches.length; i++) {
      const matchId = matches[i].id;
      if (!excludedMatchIds.includes(matchId)) {
        const price = matches[i].price;
        sum += price;
      }
    }
    return (sum / matches.length).toFixed(2);
  };

  useEffect(() => {
    setCurrentAvgPrice(calculateAverage(currentMatches));
  }, [currentMatches, excludedMatchIds]);
  
  if (!currentId) return null;
  const sortedMatches = currentMatches.reduce((newObj, match) => {
    if (!newObj[match.website_name]) newObj[match.website_name] = [];
    newObj[match.website_name].push(match);
    return newObj;
  }, {});

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        <div className="product-details-image">
          <img alt={currentName} src={currentimgSrc} />
        </div>
      </div>
      <div className="product-details-right">
        <div className="product-details-avg-price-container">
          <h1>${currentAvgPrice}</h1>
          <p>average price</p>
        </div>
        <div className="product-details-matches-container">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {(() => {
              let matches = [];
              for (const siteName in sortedMatches) {
                matches.push(
                  <MatchList
                    key={siteName}
                    siteName={siteName}
                    matches={sortedMatches[siteName]}
                  />
                );
              }
              return matches;
            })()}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
