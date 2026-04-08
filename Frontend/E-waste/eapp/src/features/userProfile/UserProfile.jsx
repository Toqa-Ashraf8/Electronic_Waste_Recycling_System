import React from "react";
import { ProgressBar } from "react-bootstrap";
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTrophy, FaEdit, FaKey } from "react-icons/fa";
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="profile-dashboard-layout">
      <div className="wide-profile-card">
        
        {/* Header Section */}
        <div className="profile-top-banner">
          <div className="header-identity">
            <FaUserCircle className="main-icon" />
            <div>
              <h1>MY ACCOUNT</h1>
              <p>Manage your recycling impact and personal details</p>
            </div>
          </div>
          <div className="eco-badge">
            <FaTrophy /> <span>ECO-WARRIOR GOLD</span>
          </div>
        </div>

        <div className="profile-main-flex-container">
          
         <div className="profile-left-sidebar">
            <div className="t-avatar-frame">
                <img 
                    src="" 
                    alt="" 
                    className="t-square-img" 
                />
            </div>
            <div className="sidebar-buttons">
                <button className="btn-mint-outline"><FaEdit /> Edit Profile</button>
                <button className="btn-mint-outline"><FaKey /> Security</button>
            </div>
        </div>
          <div className="profile-right-content">
            <div className="welcome-message">
              <h2>Welcome, <span className="name-highlight">Toqa Ashraf</span></h2>
            </div>
            <div className="info-horizontal-bar">
              <div className="info-node">
                <FaEnvelope className="node-icon" />
                <div><label>Email</label><p>toqa.ashraf@example.com</p></div>
              </div>
              <div className="info-node">
                <FaMapMarkerAlt className="node-icon" />
                <div><label>Location</label><p>Cairo, Egypt</p></div>
              </div>
              <div className="info-node">
                <FaPhoneAlt className="node-icon" />
                <div><label>Phone</label><p>+20 102 345 6789</p></div>
              </div>
            </div>

   
            <div className="points-display-box">
              <div className="points-meta">
                <span className="p-label">Recycling Points Progress</span>
                <span className="p-value">3,000 PTS</span>
              </div>
              <ProgressBar now={83} className="custom-progress-mint" />
              <p className="points-hint">You are 500 points away from your next reward!</p>
            </div>

            <div className="stats-quad-grid">
              <div className="stat-unit">
                <span className="unit-val">0</span>
                <span className="unit-label">Total Recycled</span>
              </div>
              <div className="stat-unit">
                <span className="unit-val">0</span>
                <span className="unit-label">In Progress</span>
              </div>
              <div className="stat-unit">
                <span className="unit-val">0</span>
                <span className="unit-label">Total Savings</span>
              </div>
              <div className="stat-unit highlight-unit">
                <span className="unit-val">{2026}</span>
                <span className="unit-label">Member Since</span>
              </div>
            </div>

          </div>
        </div>

        <div className="profile-card-footer">
          <button className="btn-save-main">Update My Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;