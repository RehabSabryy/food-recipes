import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom'
import { useRecipe } from '../../Context/Recipes'
import Styles from './Recipe.module.css'
import { Helmet } from 'react-helmet';
import SearchResults from '../SearchResults/SearchResults';
export default function Recipe() {
  const {id} = useParams();
  const {recipe , fetchRecipeById,loading,error} = useRecipe();
  const [foodRecipe, setFoodRecipe] = useState(null);
  useEffect(() => {
    fetchRecipeById(id);
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setFoodRecipe(recipe);
    }
    console.log("Food recipe", recipe);
  }, [recipe]);
  
  if (loading) {
    return <div className="loading-container">
    <div class="lds-heart"><div></div></div>
    </div>
  }
  if (error) return <p>Error loading recipes: {error.message}</p>;

  const getYouTubeVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/|youtube.com\/watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
    };
  //iframe video
  const videoId = foodRecipe ? getYouTubeVideoID(foodRecipe.strYoutube) : null;
  const formatInstructions = (instructions) => {
    const steps = instructions.split(/(\d+\.\s)/).filter(step => step.trim() !== '');
    const formattedSteps = [];
    for (let i = 0; i < steps.length; i += 2) {
      formattedSteps.push(steps[i] + steps[i + 1]);
    }
    return formattedSteps;
  };
  return (
    <>
    <div className='container'>
    <Helmet>
      <title>{foodRecipe ? foodRecipe.strMeal : "Recipe"}</title>
    </Helmet>
    {foodRecipe && (
      <div className="row my-5">
          <SearchResults/>
        <div className="col-md-5 d-flex flex-column align-items-center">
        <img className='w-75 rounded' src={foodRecipe.strMealThumb} alt={foodRecipe.strMeal} />
        <div>
        <h5 className="mt-5">{foodRecipe.strMeal}</h5>
        <hr/>
        <div className='d-flex justify-content-center'>
        <h6>Area :</h6> <p>{foodRecipe.strArea} </p> 
        </div>
        <div className='d-flex justify-content-center'>
        <h6>Area : </h6> <p>{foodRecipe.strCategory} </p>
        </div>
        </div>
        </div>
        <div className="ingredients col-md-6 mt-4">
          <h6>Ingredients</h6>
          <ul className={`d-flex flex-column flex-wrap ${Styles.recipe}`}>
                {[...Array(20).keys()].map(i => (
                  foodRecipe[`strIngredient${i+1}`] && foodRecipe[`strIngredient${i+1}`] !== "" && (
                    <li key={i}>{foodRecipe[`strIngredient${i+1}`]}</li>
                  )
                ))}
              </ul>
          <hr />
          <div className="instruction">
            <h6>Instruction</h6>
            {formatInstructions(foodRecipe.strInstructions).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
          </div>
          <div className='mt-4'>
            {videoId && (
              <iframe width="600" height="315" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            )}
          </div>
        </div>
        </div>
      )}
      </div>
    </>
  )
}
