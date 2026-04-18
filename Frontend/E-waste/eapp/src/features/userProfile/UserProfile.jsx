import React, { useEffect } from 'react';
import { 
    FaUserCircle, 
    FaTrophy, 
    FaEdit, 
    FaShieldAlt 
} from 'react-icons/fa';
import './UserProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../services/authService';
import { variables } from '../../components/variables';

const UserProfile = () => {
  const {userDetails,ordersCount,pendingCount}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    if (userDetails?.UserID) {
    dispatch(fetchUserOrders(userDetails.UserID));
  }
  },[dispatch,userDetails.UserID])

  const calculateProgress = () => {
    const goal = 5000;
    const percentage = ((userDetails?.Points || 0) / goal) * 100;
    return percentage > 100 ? 100 : percentage; 
  };

    return (
        <div className="tq-profile-page">
            <div className="tq-main-card">
                <aside className="tq-sidebar">
                    <div className="tq-avatar-wrapper"> 
                        {userDetails.UserImagePath ? (
                            <img src={variables.USERIMG_API + userDetails.UserImagePath} />
                        )
                        :(
                        <img src={`https://ui-avatars.com/api/?name=${userDetails.UserName}&background=55a690&color=fff&size=200`} alt="" />
                       )}   
                    </div>
                    <h3 className="tq-user-name">{userDetails.UserName}</h3>  
                </aside>
                <section className="tq-content">
                    <div className="tq-content-header">
                        <h2>Personal Information</h2>
                        <button className="tq-edit-btn"><FaEdit /> Edit</button>
                    </div>
                    <div className="tq-info-grid">
                        <div className="tq-info-box">
                            <span className="tq-label">Full Name</span>
                            <span className="tq-value">{userDetails.UserName}</span>
                        </div>
                        <div className="tq-info-box">
                            <span className="tq-label">Email Address</span>
                            <span className="tq-value">{userDetails.Email}</span>
                        </div>
                        <div className="tq-info-box">
                            <span className="tq-label">Phone Number</span>
                            <span className="tq-value">{userDetails.PhoneNumber}</span>
                        </div>
                        <div className="tq-info-box">
                            <span className="tq-label">Address</span>
                            <span className="tq-value">{userDetails.Address}</span>
                        </div>
                    </div>

                    <div className="tq-divider"></div>
                    <div className="tq-progress-area">
                        <div className="tq-progress-header">
                            <span>Points Goal</span>
                            <span>{userDetails.Points} / 3000</span> 
                        </div>
                        <div className="tq-bar-container">
                           <div 
                            className="tq-bar-fill" 
                            style={{ width: `${calculateProgress()}%`, transition: 'width 0.5s ease-in-out' }}
                         ></div>
                        </div>
                    </div>
                    <div className="tq-stats-grid">
                        <div className="tq-stat-card">
                            <span className="tq-stat-num">{ordersCount}</span> 
                            <span className="tq-stat-lbl">Orders</span>
                        </div>
                        <div className="tq-stat-card">
                            <span className="tq-stat-num">{pendingCount}</span>
                            <span className="tq-stat-lbl">Pending</span>
                        </div>
                        <div className="tq-stat-card tq-dark-card">
                            <span className="tq-stat-num">{userDetails.Points}</span> 
                            <span className="tq-stat-lbl">Total Savings</span>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default UserProfile;