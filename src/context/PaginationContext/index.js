import React, { createContext, useContext, useState } from "react";
export const PaginationContext = createContext();
export const usePagination = () => useContext(PaginationContext);

export default function PaginationProvider({ children }) {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  const [limit, setLimit] = useState(9);
  const [numOfPages, setNumOfPages] = useState(1);

  return (
    <PaginationContext.Provider
      value={{
        page,
        setPage,
        active,
        setActive,
        limit,
        setLimit,
        numOfPages,
        setNumOfPages,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
