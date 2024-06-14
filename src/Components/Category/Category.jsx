import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipe } from '../../Context/Recipes'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
export default function Category() {
  const {recipes, fetchRecipes,loading,error} = useRecipe();
    const {categoryName} = useParams();
    const [category, setCategory] = useState(null);
    useEffect(() => {
      fetchRecipes(categoryName);
    }, [categoryName]);
  
    useEffect(() => {
      if (recipes) {
        setCategory(recipes);
      }
      console.log("recipes", recipes);
    }, [recipes]);
    
  if (loading) {
    return <div className="loading-container">
    <div class="lds-heart"><div></div></div>
    </div>
  }
  if (error) return <p>Error loading recipes: {error.message}</p>;

  return (
    <>
    <div className='container'>
    <Helmet>
      <title>{categoryName} | TasteBite</title>
    </Helmet>
    <h1 className="mt-5 ms-4">{categoryName}</h1>
    <div className="row ">
    {category && category.map((recipe) => (
        <div className="col-md-3" key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`} className="card m-4">
                <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                <div className="card-body">
                    <h6 className="card-title ">{recipe.strMeal}</h6>
                </div>
            </Link>
        </div>
    ))}
    </div>
    </div>
    </>
  )
}
