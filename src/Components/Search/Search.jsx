// SearchBar.js

import React, { useState } from 'react';
import { useRecipe } from '../../Context/Recipes';

export default function SearchBar() {
  const { searchRecipes ,clearSearch} = useRecipe();
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      await searchRecipes(query);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value === '') {
      clearSearch();
    }
  };
  return (
    <form className="d-flex" onSubmit={handleSearch}>
      <input className="form-control me-2" type="search" placeholder="Search for recipes..."aria-label="Search"value={query}onChange={handleInputChange}/>
      <button className="btn btn-outline-danger" type="submit">
        Search
      </button>
    </form>
  );
}
