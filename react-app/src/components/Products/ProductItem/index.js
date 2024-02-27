import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import MatchList from "../../Match/MatchList";
import "./ProductItem.css";

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

  console.log("🖥️  >> file: index.js:7 >> ProductItem >> product: ", product);

  useEffect(() => {
    if (product.id) {
      console.log(
        "🖥️  >> file: index.js:25 >> useEffect >> product: ",
        product
      );
      console.log(
        "🖥️  >> file: index.js:32 >> useEffect >> product.avg_price: ",
        product.avg_price
      );
      console.log("product is being updated...");
      setCurrentId(product.id);
      setCurrentAvgPrice(product.avg_price);
      setCurrentName(product.name);
      setCurrentimgSrc(product.matches[0].img_src);
      setCurrentMatches(product.matches);
    }
  }, [product]);

  if (!product.id) return null;
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
        <div className="product-item-name">
          <p>{product.name}</p>
        </div>
      </div>
      <div className="product-item-right">
        <h1>Average Price: ${currentAvgPrice}</h1>
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
      </div>
    </div>
  );
};

export default ProductItem;
