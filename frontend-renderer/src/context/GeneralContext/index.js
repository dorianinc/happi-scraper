import React, { createContext, useContext, useState } from "react";

export const GeneralContext = createContext();
export const useGeneral = () => useContext(GeneralContext);

export default function GeneralProvider({ children }) {
  const [activeLink, setActiveLink] = useState(1);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState(
    "No product details found. Start by searching for a product!"
  );

  return (
    <GeneralContext.Provider
      value={{
        searching,
        setSearching,
        message,
        setMessage,
        activeLink,
        setActiveLink
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
