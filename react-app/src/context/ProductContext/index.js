import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export default function ProductProvider({ children }) {
  const [currentId, setCurrentId] = useState(0);
  const [currentAvgPrice, setCurrentAvgPrice] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [currentimgSrc, setCurrentimgSrc] = useState("");
  const [currentMatches, setCurrentMatches] = useState([]);
  const [excludedMatchIds, setExcludedMatchIds] = useState([]);

  return (
    <ProductContext.Provider
      value={{
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
        excludedMatchIds,
        setExcludedMatchIds,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
