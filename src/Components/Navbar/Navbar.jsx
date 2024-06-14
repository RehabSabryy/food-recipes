import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import SearchBar from '../Search/Search';
import { Helmet } from 'react-helmet';

export default function Navbar({ scrollToRandomRecipes, scrollToCategories, scrollToContact }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const handleNavigation = (e, scrollToSection) => {
    e.preventDefault();
    if (scrollToSection) {
      scrollToSection();
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection();
      }, 0);
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/login');
  };
  return (
    <>
      <div className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
        <Helmet>
          <title>TasteBite | Home</title>
        </Helmet> 
        <div className="text-center py-5 d-flex justify-content-center align-items-center">
          <h1 className='pe-1'>TasteBite</h1>
          <span>
            <i className="fa-solid fa-utensils" style={{ color: "rgb(231, 4, 4)" }}></i>
          </span>
        </div>
        <nav className="navbar navbar-expand-lg border-top border-bottom">
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-around py-2" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                {location.pathname === '/' ? (
                   <a className="nav-link" href='#' onClick={(e) => handleNavigation(e, scrollToCategories)}>Categories</a>
                   ) : (
                     <Link className="nav-link" to="/categories">Categories</Link>
                     
                     )}
                </li>
                <li className="nav-item">
                  {location.pathname === '/' ? (
                    <a className="nav-link" href='#' onClick={(e) => handleNavigation(e, scrollToContact)}>Contact Us</a>
                  ) : (
                    <Link className="nav-link" to="/contact">Contact</Link>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/favorites'}>Favorites</Link>
                </li>
              </ul>
              <div className="d-flex align-items-center">
              <SearchBar />
                {isLoggedIn ? (
                  <Link className="btn btn-danger ms-3" onClick={handleLogout}>Logout</Link>
                ) : (
                  <>
                    <Link to={'/login'} className="ms-4 nav-link active">Login</Link>
                    <Link to={'/signup'} className="ms-2 nav-link active">Sign Up</Link>
                  </>  
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
