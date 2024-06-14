import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate('/home');
  }
  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <img src="/404.jpg" alt="Not Found" className='w-75'/>
      </div>
    </>
  )
}
