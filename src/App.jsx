import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Recipe from './Components/Recipe/Recipe'
import Category from './Components/Category/Category'
import Contact from './Components/Contact/Contact'
import { RecipesProvider } from './Context/Recipes'
import NotFound from './Components/NotFound/NotFound'
import Categories from './Components/Categories/Categories'
import Favorites from './Components/Favorites/Favorites'
const router = createBrowserRouter([
  {path: '/', element:<Layout/>, children:[
    {path: '/home', element:<Home/>},
    {path: '/recipe/:id', element:<Recipe/>},
    {path: '/category/:categoryName', element:<Category/>},
    {path:'/contact', element:<Contact/>},
    {path:'/categories', element:<Categories/>},
    {path:'/favorites', element:<Favorites/>},
    {path:'*', element:<NotFound/>}
  ]},
  {path: '/signup', element:<Signup/>},
  {index: true, element:<Login/>}, 
])
export default function App() {
  return (
    <div className='d-flex flex-column justify-content-between' style={{minHeight:"100vh"}}>
         <RecipesProvider>
      <RouterProvider router={router} />
      </RecipesProvider>
    </div>
  )
}
