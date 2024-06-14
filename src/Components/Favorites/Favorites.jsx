import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
export default function Favorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return (
        <>
            <div className="container-fluid">
                <Helmet>
                    <title>Favorites | TasteBite</title>
                </Helmet>
                <div className="row">
                    <div className="col-12">
                        <SearchResults />
                        <h1 className="text-center mt-5">Favorites</h1>
                        {favorites.length === 0 ? (
                            <p className="text-center fs-5 text-muted">No favorites added yet.</p>
                        ) : (
                            <p className="text-center fs-5 text-muted">You have {favorites.length} favorite recipes.</p>
                        )}
                           {favorites.map((favorite) => (
                              <div className="d-flex mb-5 w-75 ms-5 ps-5" key={favorite.idMeal}>

                                <img src={favorite.strMealThumb} className='w-25' alt={favorite.strMeal} />
                                <div className="d-flex flex-column ms-5 mt-5">
                                    <Link to={`/recipe/${favorite.idMeal}`} className="text-danger">
                                        <h3 >{favorite.strMeal}</h3>
                                    </Link>
                                    <p>{favorite.strInstructions}</p>
                                </div>
                              </div>
                            ))}

                              </div>  
                            
                    </div>
                </div>
        </>
  )
}
