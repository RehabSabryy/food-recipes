// Context/Recipes.js
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const RecipesContext = createContext();

export const useRecipe = () => {
  return useContext(RecipesContext);
};

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [recipe , setRecipe] = useState(null);
  const [categories,setCategories] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [error, setError] = useState(null);

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(response.data.meals);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const fetchRecipeById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setRecipe(response.data.meals[0]);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  const fetchRandomRecipes = async (count = 11) => {
    try {
      setLoading(true);
      const requests = Array.from({ length: count }, () =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      );
      const responses = await Promise.all(requests);
      const randomMeals = responses.flatMap((response) => response.data.meals);
      setRandomRecipes(randomMeals);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      setCategories(response.data.categories);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const searchRecipes = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setSearch(response.data.meals);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const clearSearch = () => {
    setSearch([]);
  };

  const addToFavorites = (recipe) => {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const value = {
    recipes,
    randomRecipes,
    categories,
    loading,
    error,
    fetchRecipeById,
    recipe,
    fetchRecipes,
    fetchRandomRecipes,
    fetchCategories,
    searchRecipes,
    search,
    setQuery,
    query,
    addToFavorites,
    removeFromFavorites,
    favorites,
    clearSearch
  };

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  );
};
