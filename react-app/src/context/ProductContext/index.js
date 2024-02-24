import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export default function ProductProvider({ children }) {
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [currentimgSrc, setCurrentimgSrc] = useState("");
  const [currentMatches, setCurrentMatches] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        currentId,
        setCurrentId,
        currentName,
        setCurrentName,
        currentimgSrc,
        setCurrentimgSrc,
        currentMatches,
        setCurrentMatches,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
