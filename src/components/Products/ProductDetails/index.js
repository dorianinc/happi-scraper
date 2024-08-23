import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useProduct } from "../../../context/ProductContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import { getSingleProductThunk } from "../../../store/productsReducer";
import MatchList from "../../Match/MatchList";
import Accordion from "react-bootstrap/Accordion";
import "./ProductDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const {
    currentId,
    currentAvgPrice,
    setCurrentAvgPrice,
    setCurrentName,
    currentName,
    setCurrentimgSrc,
    currentimgSrc,
    setCurrentMatches,
    currentMatches,
    excludedMatchIds,
  } = useProduct();

  const calculateAverage = (matches) => {
    let sum = 0;
    let counter = 0;
    for (let i = 0; i < matches.length; i++) {
      const matchId = matches[i].id;
      if (!excludedMatchIds.includes(matchId)) {
        counter++;
        const price = matches[i].price;
        sum += price;
      }
    }
    return (sum / counter).toFixed(2);
  };

  useEffect(() => {
    dispatch(getSingleProductThunk(currentId)).then((product) => {
      console.log("🖥️  product: ", product)
      setCurrentName(product.name);
      setCurrentimgSrc(product.matches[0].imgSrc);
      setCurrentMatches(product.matches);
    });
  }, [currentId, dispatch]);

  useEffect(() => {
    setCurrentAvgPrice(calculateAverage(currentMatches));
  }, [currentMatches, excludedMatchIds]);

  if (!currentId) return null;
  const sortedMatches = currentMatches
    .sort((a, b) => a.websiteName.localeCompare(b.websiteName))
    .reduce((newObj, match) => {
      if (!newObj[match.websiteName]) newObj[match.websiteName] = [];
      newObj[match.websiteName].push(match);
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
          <h1 className={`header-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
            ${currentAvgPrice}
          </h1>
          <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
            average price
          </p>
        </div>
        <div className="product-details-matches-container">
          <Accordion
            className={`accordion ${darkMode ? "dark-mode" : "light-mode"}`}
            defaultActiveKey={["0"]}
            alwaysOpen
          >
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
