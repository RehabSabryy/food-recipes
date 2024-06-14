import React, { useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import TopButton from '../TopButton/TopButton'

export default function Layout() {
  const randomRecipesRef = useRef(null);
  const categoriesRef = useRef(null);
  const contactRef = useRef(null);
  const scrollToRandomRecipes = () => {
    if (randomRecipesRef.current) {
      randomRecipesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToCategories = () => {  
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
    <Navbar  scrollToRandomRecipes={scrollToRandomRecipes} scrollToCategories={scrollToCategories} scrollToContact={scrollToContact}/>
    <Outlet context={{ randomRecipesRef, categoriesRef, contactRef }}></Outlet>
    <TopButton/>
    <Footer/>
    </>
  )
}
