import React ,{useEffect} from 'react'
import { useRecipe } from '../../Context/Recipes'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import SearchResults from '../SearchResults/SearchResults';
export default function Categories() {
    const { loading, error,categories, fetchCategories } = useRecipe();
      useEffect(() => {
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
    <div className="container">
    <Helmet>
      <title>Categories | TasteBite</title>
    </Helmet>
    <SearchResults/>
    <h3 className="mt-5 ms-4 text-muted">All Categories for any meal you want!</h3>
    <div className="row ">
    {categories && categories.map((category) => (
        <div className="col-md-3" key={category.strCategory}>
            <Link to={`/category/${category.strCategory}`} className="card m-4 text-decoration-none ">
                <img src={category.strCategoryThumb} className="card-img-top" alt={category.strCategory} />
                <div className="card-body">
                    <h6 className="card-title text-center ">{category.strCategory}</h6>
                </div>
            </Link>
        </div>
    ))}
    </div>
    </div>
    </>
  )
}
