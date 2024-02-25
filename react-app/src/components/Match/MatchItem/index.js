import { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import "./MatchItem.css";

const MatchItem = ({ match }) => {
  console.log("🖥️  >> file: index.js:6 >> MatchItem >> product: ", product)
  const {
    currentId,
    setCurrentId,
    currentName,
    setCurrentName,
    currentimgSrc,
    setCurrentimgSrc,
    currentMatches,
    setCurrentMatches,
  } = useProduct();

  console.log("🖥️  >> file: index.js:7 >> MatchItem >> product: ", product);

  useEffect(() => {
    if(product.id){
      console.log("product is being updated...");
      setCurrentId(product.id)
      setCurrentName(product.name)
      setCurrentimgSrc(product.matches[0].img_src)
      setCurrentMatches(product.matches)
    }
  }, [product]);

  if (!product.id) return null;
  return (
    <div className="product-item-container">
      <div className="product-item-left">
        <div className="product-item-image">
          <img alt={currentName} src={currentimgSrc}/>
        </div>
        <div className="product-item-name">
          <p>{product.name}</p>
        </div>
      </div>
      <div className="product-item-right">
        
      </div>
    </div>
  );
};

export default MatchItem;
