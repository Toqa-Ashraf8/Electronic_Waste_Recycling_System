import React from "react";
import "./SellDevice.css";
import { Link } from "react-router-dom";
import { FaRecycle, FaGift, FaMoneyBillWave } from "react-icons/fa";
import { FiTag, FiBox, FiUpload, FiHeart, FiTruck, FiNavigation, FiMapPin, FiCalendar } from "react-icons/fi";

function SellDevice() {
  return (
    <div className="sell-waste-page-hud">
      <div className="sell-waste-card-hud animate__animated animate__fadeIn">
        
        {/* Header - ملموم أكتر */}
        <div className="card-header-hud">
          <FaRecycle className="card-icon-hud" />
          <h1 className="card-title-hud">VALUE YOUR E-WASTE</h1>
          <p className="card-subtitle-hud">Get an instant estimate for your items</p>
        </div>

        {/* Banner */}
        <div className="rewards-banner-hud">
          <FaGift className="rewards-icon-hud" />
          <p className="rewards-text-hud">
            <strong>Every Sale is Rewarded!</strong> Earn <strong>10 Points</strong>.
            <Link to="/points" className="rewards-learn-more-hud"> Learn More</Link>
          </p>
        </div>

        {/* الجريد الأساسي تقسيم 70% بيانات و 30% صورة */}
        <div className="main-form-grid-hud">
          
          {/* العمود الشمال: البيانات (مقسمة لخطوات) */}
          <div className="form-column-inputs-hud">
            <h2 className="section-title-hud">1. Item Details</h2>
            <div className="inputs-inline-row">
              <div className="form-group-hud">
         
                <select className="form-select" required>
                  <option value="">Select Category...</option>
                </select>
              </div>
              <div className="form-group-hud">
     
                <select className="form-select" required>
                  <option value="">Select Item...</option>
                </select>
              </div>
            </div>

            <div className="quality-condition-grid-hud">
              <div className="form-group-hud">
                <label className="slider-label-hud">Quality Index</label>
                <input type="range" className="quality-slider-hud" min="1" max="99" />
              </div>
              <div className="form-group-hud">
               
                <select className="form-select" required>
                  <option value="">Condition...</option>
                </select>
              </div>
            </div>
            <div className="price-estimate-box-hud animate__animated animate__pulse">
              <FaMoneyBillWave className="price-icon-hud" />
              <p className="price-label-hud">Estimated Value</p>
              <p className="price-value-hud">~ EGP</p>
            </div>
          
          </div>

     
          <div className="form-column-image-hud">
            <h2 className="section-title-hud">2. Device Image (preffered)</h2>
            <label htmlFor="imageUpload" className="image-upload-box-hud">
              <div className="placeholder-content-hud">
                <FiUpload size={24} />
                <p>Upload Photo</p>
              </div>
            </label>
            <input type="file" id="imageUpload" className="d-none" />
                  <h2 className="section-title-hud with-margin-top">3. Pickup Info</h2>
            <div className="pickup-method-selector-hud">
              <button type="button" className="method-btn-hud active"><FiTruck /> Home</button>
              <button type="button" className="method-btn-hud"><FiNavigation /> Drop-off</button>
            </div>

            <div className="inputs-inline-row">
              <div className="form-group-hud">
               
                <input type="text" className="form-control"  required />
              </div>
              <div className="form-group-hud">
                <input type="text" className="form-control"  required />
              </div>
            </div>
          </div>
          
        </div>
      
        <div className="form-footer-hud">
          <button className="btn btn-register">SUBMIT REQUEST</button>
        </div>
      </div>
    </div>
  );
}

export default SellDevice;