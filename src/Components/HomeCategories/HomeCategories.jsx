import React, { useState } from 'react';
import Styles from "./HomeCategories.module.css";
import { Link } from 'react-router-dom';
import foodImg from '../../Assets/food.png';
import pizzaImg from '../../Assets/pizza2.png';

export default function HomeCategories({ categories }) {
  const [startIndex, setStartIndex] = useState(0);
  const [description, setDescription] = useState('');

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 5 < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  function showDesc(category) {
    setDescription(category);
  }

  if (!categories || categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row w-100">
          <div className="col-md-12">
            <h1 className="text-center">Categories</h1>
          </div>
        </div>
        <div className={`row align-items-center w-100`}>
          <div className="col-md-1">
            {startIndex > 0 && <button className="btn btn-light" onClick={handlePrev}><i className="fa-solid fa-angles-left" style={{ color: "#b8b8b8" }}></i></button>}
          </div>
          <div className="col-md-10">
            <div className="row">
              {categories.slice(startIndex, startIndex + 5).map(category => (
                <Link to={`/category/${category.strCategory}`} className="col-md-2 m-3" key={category.idCategory}>
                  <div className="card btn" onClick={() => showDesc(category.strCategoryDescription)}>
                    <img src={category.strCategoryThumb} className="card-img-top" alt={category.strCategory} />
                    <div className="card-body">
                      <h6 className="card-title text-center">{category.strCategory}</h6>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-md-1">
            {startIndex + 5 < categories.length && <button className="btn btn-light" onClick={handleNext}><i className="fa-solid fa-angles-right" style={{ color: "#b8b8b8" }}></i></button>}
          </div>
        </div>
        <div className={`desc w-75 m-auto p-3 ${Styles.desc}`}>
          {description && <p>{description}</p>}
        </div>
        <div className={`${Styles.banner} d-flex justify-content-between align-items-center mb-5`}>
          <img className={Styles.img1} src={foodImg} alt="food" />
          <h3 className='text-muted'>Daily Food Recipes</h3>
          <img className={Styles.img2} src={pizzaImg} alt="food" />
        </div>
      </div>
    </>
  );
}
