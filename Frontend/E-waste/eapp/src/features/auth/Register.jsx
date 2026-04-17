import React, { useRef } from 'react';
import './Register.css'; 
import {Link, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { setUserValues } from '../../redux/auth/authSlice';
import { newUserRegister, saveImagePath } from '../../services/authService';
import { variables } from '../../components/variables';
import { toast } from 'react-toastify';
import { options } from 'toastr';
const Register = () => {
  const {user,userImgPath,token}=useSelector((state)=>state.auth);
  const {isLoading}=useSelector((state)=>state.ui);
  const dispatch=useDispatch();
  const navigate=useNavigate();

const confirmingPassword=(confirmPassword)=>{
    if(confirmPassword!=="" && user.Password !==""){
    if(confirmPassword!==user.Password){
     toast.error("Confirm password does not match. Please try again!",{
            theme:"colored",
            position:"top-right"
        })
        confirmPassRef.current.focus();
        return ; 
     }
    }
}
const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setUserValues({[name]:value}));
}
 const handleImageUpload = async (e) => {
    const { name } = e.target;
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    const fileName = file.name;
    formData.append("file", file, fileName);
    await dispatch(saveImagePath(formData));
    await dispatch(setUserValues({[name]:fileName}));
  };

const registerUser=async()=>{
    const data={...user,Points:0};
    const result=await dispatch(newUserRegister(data)).unwrap();
    if(result.token){
         toast.success("Registration successful! Welcome to E-VIVE",{
            theme:"colored",
            position:"top-right"
        })
        navigate('/home')
    }
}

    return (
        <div className="container register-container">
            <div className="register-card row g-0">
                <div className="col-md-7 register-inputs-section">
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">Join E-VIVE and start recycling your devices.</p>      
                    <div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">User Name</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="UserName"  
                                value={user.UserName}
                                onChange={handleChange}
                                autoComplete='off'
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Phone Number</label>
                                <input 
                                type="tel" 
                                className="form-control" 
                                name="PhoneNumber" 
                                value={user.PhoneNumber}
                                onChange={handleChange}
                                autoComplete='off'
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            name="Email" 
                            value={user.Email} 
                            onChange={handleChange}
                            autoComplete='off'
                            />
                        </div>

                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="Address"  
                                value={user.Address}
                                onChange={handleChange}
                                autoComplete='off'
                                 />
                            </div>
                           
                             <div className="row">
                                <div className="col-md-6 mb-3">
                                <label className="form-label">Password</label>
                                 <input 
                                 type="password" 
                                 className="form-control" 
                                 name="Password" 
                                 value={user.Password} 
                                 onChange={handleChange}
                                 autoComplete='off'
                                  />
                             </div>
                             <div className="col-md-6 mb-3">
                                <label className="form-label"> Confirm Password</label>
                                <input 
                                type="password" 
                                className="form-control"
                                name='confirmPassword'
                                onBlur={(e)=>confirmingPassword(e.target.value)}
                                />
                            </div>
                           </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select 
                            className="form-select" 
                            name="Role" 
                            value={user.Role} 
                            onChange={handleChange}
                            >
                               <option value="-1">-- select --</option>
                                <option value="Customer">Customer </option> 
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <button 
                        className="btn btn-register"
                        onClick={()=>registerUser()}
                        disabled={isLoading}
                        >
                            Register 
                        </button>
                    </div>
                    <p className="login-link">
                        Already have an account? 
                        <Link to="/login">Login</Link>
                    </p>
                </div>

                <div className="col-md-5 register-image-section text-center">
                    <div className="image-preview-wrapper">      
                            <img src={variables.USERIMG_API+userImgPath} alt="" />                    
                            <div className="upload-placeholder">
                            </div>                        
                      </div>                   
                            <label 
                            htmlFor="profileImage" 
                            className="btn btn-outline-secondary btn-sm" 
                            style={{ borderRadius: '20px', cursor: 'pointer' }}
                             >
                               Select Photo
                         </label>
                        <input 
                            type="file" 
                            id="profileImage" 
                            name="UserImagePath" 
                            accept="image/*"
                            style={{ display: 'none' }} 
                            onChange={handleImageUpload} 
                        />
                </div>
            </div>
        </div>
    );
};

export default Register;