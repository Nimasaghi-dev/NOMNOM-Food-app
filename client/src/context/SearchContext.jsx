import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, updateSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
