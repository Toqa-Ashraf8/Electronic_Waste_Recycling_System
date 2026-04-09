import React, { useEffect, useState } from "react";
import "./SellDevice.css";
import { Link } from "react-router-dom";
import { FaRecycle, FaGift, FaMoneyBillWave } from "react-icons/fa";
import { Save, BrushCleaning ,Search ,Trash } from 'lucide-react';
import { BsFillSendFill } from "react-icons/bs";
import { 
  FiTag, 
  FiBox, 
  FiUpload, 
  FiHeart, 
  FiTruck, 
  FiNavigation, 
  FiMapPin, 
  FiCalendar 
} from "react-icons/fi";
import { motion } from "framer-motion";
import {useSelector,useDispatch} from 'react-redux'
import { fetchCategories, fetchItems } from "../../services/categoryService";
import { setRequestValues } from "../../redux/selldevice/sellingSlice";
function SellDevice() {
  const {categories}=useSelector((state)=>state.category);
  const {request}=useSelector((state)=>state.selldevice);
  const dispatch=useDispatch();
    const [activeMethod, setActiveMethod] = useState("");

  const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setRequestValues({[name]:value}));
  }
console.log("request",request);
    const handleQualityChange = (e) => {
        const estimateBox = document.getElementById('estimateBox');
        if (e.target.value !== "" && estimateBox) {
            estimateBox.classList.remove('is-dimmed');
            estimateBox.classList.add('animate__pulse'); 
        }
    };
const fillItems=(index)=>{
  const catId=index;
  console.log("catId",catId);
  /* dispatch(fetchItems(catId)); */
}
    useEffect(()=>{
      dispatch(fetchCategories());
    },[])
 
  return (
    <div>
    <div className="page-container">
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
           <div className="btns-container-sell col">
                 <button 
                className="btn btn-sell" >
                  <BrushCleaning size={25} color="black"/>
                </button>
                <button 
                className="btn btn-sell"
                >
                  <BsFillSendFill size={25} color="#00b4d8"/>
                </button>
          </div>
        <div className="card-header-hud">
          <FaRecycle className="card-icon-hud" />
          <h1 className="card-title-hud">VALUE YOUR E-WASTE</h1>
          <p className="card-subtitle-hud">Get an instant estimate for your items</p>
        </div>
        <div className="rewards-banner-hud">
          <FaGift className="rewards-icon-hud" />
          <p className="rewards-text-hud">
            <strong>Every Sale is Rewarded!</strong> Earn <strong>10 Points</strong>.
            <Link to="/points" className="rewards-learn-more-hud"> Learn More</Link>
          </p>
        </div>
        <div className="main-form-grid-hud">
          <div className="form-column-inputs-hud">
            <h2 className="section-title-hud">1. Item Details</h2>
            <div className="inputs-inline-row">
              <div className="form-group-hud">
                <label className="label-hud">Category</label>
                <select 
                className="form-select"
                name="DeviceCategory"
                value={request.DeviceCategory}
                onChange={handleChange}
                required >
                  <option value="-1">- Select Category -</option>  
                  {categories.map((c,index)=>
                    <option 
                    key={index} 
                    value={c.CategoryName} 
                    >
                    {c.CategoryName}
                    </option> )}
                </select>
             
              </div>
               <div className="form-group-hud">
                <label className="label-hud">Brand Name</label>
                <select 
                className="form-select"
                name="DeviceBrand"
                value={request.DeviceBrand}
                onChange={handleChange} 
                required>
                  <option value="-1">- Select Brand -</option>
                </select>
              </div>
             {/*  <div className="form-group-hud">
                <label className="label-hud">Item</label>
                <select className="form-select" required>
                  <option value="">- Select Item -</option>
                </select>
              </div> */}
            </div>

            <div className="quality-condition-grid-hud">
              <div className="form-group-hud">
                <label className="label-hud">Quality</label>
                <select 
                className="form-select qualityinp" 
                name="DeviceQuality"
                value={request.DeviceQuality}
                onChange={handleChange} 
                required 
                >
                  <option value="-1">- Select -</option>
                </select>
              </div>
            </div>
          
          <div id="estimateBox" className="price-estimate-box-hud is-dimmed">
              <FaMoneyBillWave className="price-icon-hud" />
              <p className="price-label-hud">Suggested price based on selected quality:</p>
              <p className="price-value-hud">0 EGP</p>
          </div>
          </div>
          <div>
           <div className="form-column-image-hud">
            <h2 className="section-title-hud">2. Device Image (preffered)</h2>
            <label htmlFor="imageUpload" className="image-upload-box-hud">
              <div className="placeholder-content-hud">
                <FiUpload size={24} />
                <p>Upload Photo</p>
              </div>
            </label>
            <input 
            type="file" 
            id="imageUpload" 
            className="d-none"
            name="DeviceImage"
            value={request.DeviceImage}
            onChange={handleChange}
            />
            <h2 className="section-title-hud with-margin-top">3. Pickup Info</h2>
            <div className="pickup-method-selector-hud">
              <button 
              type="button" 
              className={`method-btn-hud ${activeMethod === 'home' ? 'active' : ''}`}
              onClick={() => setActiveMethod('home')}
              ><FiTruck /> 
              Home
              </button>
              <button 
              type="button" 
              className={`method-btn-hud ${activeMethod === 'dropoff' ? 'active' : ''}`}
              onClick={() => setActiveMethod('dropoff')}
              ><FiNavigation /> 
              Drop-off
              </button>
            </div>

           {/*  <div className="inputs-inline-row">
                 <div className="form-group-hud">
                 <select className="form-select" required>
                  <option value="" style={{textAlign:'center'}}>- Select Branch -</option>
                </select>
              </div>
              <div className="form-group-hud">
                 <label className="label-hud">Address</label>
                <input type="text" className="form-control"  required />
              </div>
              <div className="form-group-hud">
                <label className="label-hud">Pickup Date</label>
                <input type="date" className="form-control"  required />
              </div>
            </div>  */}
          </div> 
          </div>
        </div>
       
      </motion.div>
    </div>
     <div style={{ width: '90%', margin: 'auto', paddingTop: '40px' }}>
    <table className="table table-striped table-bordered animate__animated animate__fadeInUp">
        <thead className="custom-table-header">
            <tr>
                <th>Request ID</th>
                <th>Category</th>
                <th>Item</th>
                <th>Device Brand</th>
                <th>Quality</th>
                <th>Condition</th>
                <th>Price (EGP)</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody> 
        </tbody>
    </table>
</div>
    </div>
  );
}

export default SellDevice;