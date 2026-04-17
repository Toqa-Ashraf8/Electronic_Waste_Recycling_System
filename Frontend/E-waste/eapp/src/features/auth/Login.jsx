import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import { setUserValues } from '../../redux/auth/authSlice';
import { loginUser } from '../../services/authService';

const Login = () => {
    const {isLoading}=useSelector((state)=>state.ui);
    const {user,token,userDetails}=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


const handlechange=(e)=>{
    const {name,value}=e.target;
    dispatch(setUserValues({[name]:value}));
}
const handleLogin = async () => {
        if (!user.Email || !user.Password) {
            toast.warning("Please enter your email and password.");
            return;
        }
        try {
            const result = await dispatch(loginUser(user)).unwrap();
            const {token}=result;
            if (token) {
                sessionStorage.setItem('token',token);
                toast.success("Welcome to E-VIVE!",{
                    theme:"colored",
                    position:"top-right"
                });
                 navigate('/home');
            }
        } catch (error) {}
};
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleLogin(); 
  }
};
    return (
        <div className="login-modern-page">
            <div className="login-modern-card">
                <div className="login-modern-header">
                    <h2>Welcome</h2>
                    <p>Log in to continue recycling with E-VIVE</p>
                </div>
                <div className="login-modern-form">
                    <div className="floating-group">
                        <input 
                            type="email" 
                            className="floating-input"
                            name='Email'
                            placeholder=" " 
                            value={user.Email}
                            onChange={handlechange}
                            required 
                        />
                        <label className="floating-label">Email Address</label>
                    </div>
                    <div className="floating-group">
                        <input 
                            type="password" 
                            className="floating-input"
                            name='Password'
                            placeholder=" " 
                            value={user.Password}
                            onChange={handlechange}
                            onKeyDown={handleKeyDown}
                            required 
                        />
                        <label className="floating-label">Password</label>
                    </div>
                    <button 
                    className="login-modern-btn"
                    disabled={isLoading}
                    onClick={()=>handleLogin()}
                    >
                        Login Now
                    </button>
                </div>
                <div className="login-modern-footer">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;