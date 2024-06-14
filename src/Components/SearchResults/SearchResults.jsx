import React from 'react';
import { useRecipe } from "../../Context/Recipes";

export default function SearchResults () {
  const { search, loading, error } = useRecipe();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      {search && search.length > 0 && (
        <>
          <h3 className="my-5 text-center">Results for {search[0].strMeal}</h3>
          {search.map((recipe) => (
            <div key={recipe.idMeal} className="row mb-5">
              <div className="col-md-4">
                <img src={recipe.strMealThumb}className="img-fluid rounded mb-3" alt={recipe.strMeal} />
              </div>
              <div className="col-md-7">
                <h4>{recipe.strMeal}</h4>
                <p>{recipe.strInstructions}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

