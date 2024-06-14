import React , {useState,useEffect} from 'react'
import Styles from './TopButton.module.css'

export default function TopButton() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.pageYOffset > 300) {
            setShowTopBtn(true);
          } else {
            setShowTopBtn(false);
          }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      const scrollToTop = () => {
        window.scrollTo({
          top: 0, behavior: 'smooth'
        });
      }
  return (
    <>

    <button className={`rounded border-0 ${Styles.topBtn} ${showTopBtn ? 'show' : ''}`} onClick={scrollToTop}>
    <i className="fa-solid fa-arrow-up text-white"></i>
    </button>
    </>
  )
}
