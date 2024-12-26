import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProduct } from "../../../context/ProductContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import { getSingleProductThunk } from "../../../store/productsReducer";
import { getMatchesThunk } from "../../../store/matchReducer";
import MatchList from "../../Match/MatchList";
import Accordion from "react-bootstrap/Accordion";
import "./ProductDetails.css";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const product = useSelector((state) => state.products.currentProduct);
  console.log("🖥️  product in product details: ", product);
  const matches = useSelector((state) => state.matches);
  console.log("🖥️  matches in product details: ", matches);
  const [name, setName] = useState("");
  const [avgPrice, setAvgPrice] = useState(0);
  const [image, setImage] = useState("");
  const [currentId] = useState(location.pathname.split("/")[2]);

  useEffect(() => {
    console.log("current id: ", location.pathname.split("/")[2]); // e.g., "/current-path"
    if (currentId) {
      dispatch(getSingleProductThunk(currentId));
      dispatch(getMatchesThunk(currentId));
    }
  }, [currentId]);

  useEffect(() => {
    if (!matches.length) return;
    setAvgPrice(calculateAverage(matches));
    setImage(matches[0]?.imgSrc);
  }, [matches]);

  useEffect(() => {
    if (!product) return;
    setName(product.name);
  }, [product]);

  const calculateAverage = (matches) => {
    let sum = 0;
    let counter = 0;
    matches.forEach(({ id, price }) => {
      sum += price;
      counter++;
    });
    return counter ? (sum / counter).toFixed(2) : "0.00";
  };

  const sortedMatches = [...matches]
    .sort((a, b) => a.websiteName.localeCompare(b.websiteName))
    .reduce((acc, match) => {
      acc[match.websiteName] = acc[match.websiteName] || [];
      acc[match.websiteName].push(match);
      return acc;
    }, {});

  return (
    <div className="product-details-container">
      {product ? (
        <>
          <div className="product-details-left">
            <div className="product-details-image">
              <img alt={name} src={image} />
            </div>
          </div>
          <div className="product-details-right">
            <div className="product-details-avg-price-container">
              <h1 className={`header-tag ${darkMode ? "dark-mode" : ""}`}>
                ${avgPrice}
              </h1>
              <p className={`p-tag ${darkMode ? "dark-mode" : ""}`}>
                average price
              </p>
            </div>
            <div className="product-details-matches-container">
              <Accordion
                className={`${darkMode ? "dark-mode" : ""}`}
                defaultActiveKey={["0"]}
                alwaysOpen
              >
                {Object.entries(sortedMatches).map(([siteName, matches]) => (
                  <MatchList
                    key={siteName}
                    siteName={siteName}
                    matches={matches}
                  />
                ))}
              </Accordion>
            </div>
          </div>
        </>
      ) : (
        <div className="centered-div">
          <p
            id="no-product-message"
            className={`${darkMode ? "dark-mode" : ""}`}
          >
            No product details found. Start by searching for a product!
            <span>
              <img alt="boxes" src="../public/images/happi-supply-boxes.png" />
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
