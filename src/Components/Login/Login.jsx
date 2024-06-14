import React , { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Login() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = localStorage.getItem('userData');
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            if (parsedUserData.email === formData.email && parsedUserData.password === formData.password) {
                setErrors({});
                setTimeout(() => {
                    setLoading(false);
                    navigate('/home');
                }, 1000);
            } else {
                setLoading(false);
                setErrors({ form: 'Invalid email or password' });
            }
        } else {
            setLoading(false);
            setErrors({ form: 'No user data found, please sign up first' });
        }
    };
  return (
    <>
    <div className="container-fluid row vh-100">
        <Helmet>
            <title>TasteBite | Login</title>
        </Helmet>    
    <div className="col-md-3 bg-danger">
            <img src="/chef.png" alt="signup" className='d-flex justify-content-center mt-5 pt-5 w-100'/>
        </div>
    <div className="col-md-6 mx-auto d-flex flex-column justify-content-center">
        <div className='d-flex justify-content-center align-items-center'>
            <h1 className='text-center pe-1'>Log In</h1>
            <i className="fa-solid fa-utensils fa-lg" style={{ color: "rgb(231, 4, 4)" }}></i>
        </div>
        <h6 className="text-muted text-center">Can't wait for your next meal!</h6>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={formData.email} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} value={formData.password}/>
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-danger w-25">
                    {loading ? (
                        <i className="fa-solid fa-spinner fa-pulse"></i>
                    ):  ("Log In")}
                </button>
            </div> 
            <p className="text-center my-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>   
        </form>
    </div>
</div>
</>
  )
}
