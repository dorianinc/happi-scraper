import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import MatchList from "../../Match/MatchList";
import "./ProductItem.css";
import Accordion from "react-bootstrap/Accordion";

const ProductItem = ({ product }) => {
  console.log("🖥️  >> file: index.js:6 >> ProductItem >> product: ", product);
  const {
    currentId,
    setCurrentId,
    currentAvgPrice,
    setCurrentAvgPrice,
    currentName,
    setCurrentName,
    currentimgSrc,
    setCurrentimgSrc,
    currentMatches,
    setCurrentMatches,
  } = useProduct();

  useEffect(() => {
    if (product.id) {
      setCurrentId(product.id);
      setCurrentName(product.name);
      setCurrentimgSrc(product.matches[0].img_src);
      setCurrentMatches(product.matches);
      setCurrentAvgPrice(calculateAverage(product.matches));
    }
  }, [product]);

  const calculateAverage = (matches) => {
    let sum = 0;
    for (let i = 0; i < matches.length; i++) {
      const price = matches[i].price;
      sum += price;
    }
    return (sum / matches.length).toFixed(2);
  };

  if (!currentId) return null;
  const sortedMatches = currentMatches.reduce((newObj, match) => {
    if (!newObj[match.website_name]) newObj[match.website_name] = [];
    newObj[match.website_name].push(match);
    return newObj;
  }, {});

  return (
    <div className="product-item-container">
      <div className="product-item-left">
        <div className="product-item-image">
          <img alt={currentName} src={currentimgSrc} />
        </div>
        {/* <div className="product-item-name">
          <p>{product.name}</p>
        </div> */}
      </div>
      <div className="product-item-right">
        <div className="product-item-avg-price-container">
          <h1>${currentAvgPrice}</h1>
          <p>average price</p>
        </div>
        <div className="product-item-matches-container">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {(() => {
              let matches = [];
              for (const siteName in sortedMatches) {
                matches.push(
                  <MatchList
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

export default ProductItem;
