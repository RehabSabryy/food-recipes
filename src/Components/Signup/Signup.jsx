import React , { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Joi from 'joi';
export default function Signup() {
    const [formData,setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(8).max(30).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({ 'any.only': 'Passwords do not match' })
    })
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = schema.validate(formData, { abortEarly: false });
        if (error) {
          const errorMessages = {};
          error.details.forEach(detail => {
            errorMessages[detail.path[0]] = detail.message;
          });
          setErrors(errorMessages);
          setLoading(false);
        } else {
            setErrors({});
            setTimeout(() => { 
            localStorage.setItem('userData', JSON.stringify(formData));
            setLoading(false);  
            navigate('/')
        }, 1000);
    }
  }
    return (
    <>
    <div className="container-fluid row  vh-100">
        <Helmet>
            <title>TasteBite | Signup</title>
        </Helmet>
        <div className="col-md-3 bg-danger">
            <img src="/chef.png" alt="signup" className='d-flex justify-content-center mt-5 pt-5 w-100'/>
        </div>
        <div className="col-md-6 mx-auto d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
                <h1 className='text-center pb-2  pe-1'>Signup</h1>
                <i className="fa-solid fa-utensils fa-lg" style={{ color: "rgb(231, 4, 4)" }}></i>
            </div>
            <h6 className="text-muted text-center">Sign up to save your favorites.</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control mb-2" id="username" onChange={handleChange} value={formData.username}/>
                    {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control mb-2" id="email" aria-describedby="emailHelp" onChange={handleChange} value={formData.email}/> 
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control mb-2" id="password"onChange={handleChange} value={formData.password}/>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" onChange={handleChange} value={formData.confirmPassword}/>
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}

                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-danger w-25 py-2 fw-bold">
                        {loading ? (
                            <i className="fa-solid fa-spinner fa-pulse"></i>
                        ):  ("Sign Up")}
                    </button>
                </div>  
                <p className="text-center my-3">Already have an account? <Link to="/login">Login</Link></p>  
            </form>
        </div>
    </div>
    </>
  )
}
