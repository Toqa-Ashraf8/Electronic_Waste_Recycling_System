import React, { useState } from 'react';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaTicketAlt, 
  FaStar, 
  FaArrowLeft 
} from 'react-icons/fa';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { variables } from '../../components/variables';
const PaymentPage = () => {
  const {selectedItems}=useSelector((state)=>state.store);
  const navigate=useNavigate();

  return (
    <div className="payment-page-container animate__animated animate__fadeIn">
      <div className="payment-wrapper">
        <div className="cart-section">
          <button onClick={()=>navigate('/store')} className="back-to-store">
            <FaArrowLeft /> Back to Store
          </button>
          <h2 className="section-title">Shopping Cart</h2>
          
          <div className="cart-list">
            {selectedItems.map((item,index) => (
              <div key={item.ProductID} className="cart-item-row">
                <img 
                src={variables.PRODUCTIMG_API+item.ProductImagePath} 
                alt="" 
                width={70}
                height={70}
                className="item-img" />
                <div className="item-info">
                  <h4>{item.ProductName}</h4>
                  <p>{item.Points} <FaStar className="star-mini" /></p>
                </div>
                <div className="qty-control">
                  <button><FaMinus /></button>
                  <span>{item.quantity}</span>
                  <button><FaPlus /></button>
                </div>
                <div className="item-price">
                  {item.Price * item.Stock} <small>EGP</small>
                </div>
                <button className="remove-btn"><FaTrash /></button>
              </div>
            ))} 
          </div>
        </div>
        <div className="summary-section">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-details">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>0 EGP</span>
            </div>
        
            <div className="points-discount-card">
              <div className="points-info">
                <FaStar className="star-main" />
                <div>
                  <p className="p-title">Use Your Points</p>
                  <p className="p-balance">Balance: 0 Pts</p>
                </div>
              </div>
              <div className="discount-action">
                <p className="discount-amt">- 0 EGP</p>
                <label className="switch">
                  <input type="checkbox"/>
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="promo-code-box">
              <FaTicketAlt />
              <input type="text" placeholder="Promo Code" />
              <button>Apply</button>
            </div>

            <div className="total-line">
              <span>Total Amount</span>
              <span className="total-price">0 EGP</span>
            </div>
            
            <button className="checkout-btn">Proceed to Payment</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;