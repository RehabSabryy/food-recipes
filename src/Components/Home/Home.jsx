import React, { useEffect, useState ,useRef} from "react";
import { useRecipe } from "../../Context/Recipes";
import Styles from "./Home.module.css";
import HomeCategories from "../HomeCategories/HomeCategories";
import Contact from "../Contact/Contact";
import { Link, useOutletContext } from "react-router-dom";
import {Helmet} from "react-helmet";
import SearchResults from "../SearchResults/SearchResults";
export default function Home() {
  const { randomRecipes,loading, error, fetchRandomRecipes, categories, fetchCategories,favorites,addToFavorites,removeFromFavorites,search } = useRecipe();
  const { categoriesRef, contactRef } = useOutletContext();

    useEffect(() => {
    fetchRandomRecipes();
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading-container">
    <div class="lds-heart"><div></div></div>
    </div>
  }
  if (error) return <p>Error loading recipes: {error.message}</p>;

  return (
    <>
      <div className="container-fluid mt-4 p-0">
        <Helmet>
          <title>Home | TasteBite</title>
        </Helmet>
        <SearchResults/>
        <div className="col-md-11">
          <div className="randomRecipes d-flex flex-wrap justify-content-end">
            <div className="col col-md-4 d-flex flex-column justify-content-center">
              <h1>TasteBite Recipes</h1>
              <p className="text-muted">Cooking is an art, but all art requires knowing something about the techniques and materials.</p>
              <hr />
            </div>
            {randomRecipes.map((recipe) => (
              <div className="col-md-3 m-3 text-decoration-none" key={recipe.idMeal}>
                <div className="card w-100 position-relative">
                  <button
                    className="btn btn-warning position-absolute end-0 p-2"
                    onClick={() =>
                      favorites.some((fav) => fav.idMeal === recipe.idMeal)
                        ? removeFromFavorites(recipe)
                        : addToFavorites(recipe)
                    }
                  >
                    {favorites.some((fav) => fav.idMeal === recipe.idMeal) ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </button>
                  <Link to={`/recipe/${recipe.idMeal}`}>
                    <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title text-center">{recipe.strMeal}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`my-3 p-5 d-flex justify-content-between align-items-baseline ${Styles.banner}`}  ref={categoriesRef}>
          <h2>Daily Cooking Recipes and tips.</h2>
          <p className="text-muted">Made with love and passion <i className="fa-solid fa-heart" style={{ color: "#e70404" }}></i></p>
        </div>
        <HomeCategories categories={categories} />
        <div className="contact" ref={contactRef}>
        <Contact />
        </div>
      </div>
    </>
  );
}
