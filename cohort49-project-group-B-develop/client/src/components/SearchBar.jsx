// SearchBar.js
import React from "react";
import { useSearch } from "../context/SearchContext";
import Input from "./Input";

function SearchBar() {
  const { searchTerm, updateSearchTerm } = useSearch(); // Accessing context data

  // Function to handle input change
  const handleChange = (value) => {
    updateSearchTerm(value); // Updating the search term
  };

  return (
    <div>
      <Input
        name="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
