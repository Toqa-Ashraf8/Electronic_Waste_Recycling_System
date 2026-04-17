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
import { useDispatch, useSelector } from 'react-redux';
import { variables } from '../../components/variables';
import { 
  decrementQuantity, 
  incrementQuantity, 
  removeItem, 
  togglePointsUsage
} from '../../redux/TechStore/storeSlice';
const PaymentPage = () => {
  const {selectedItems,isUsingPoints}=useSelector((state)=>state.store);
  const {userDetails}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();


  const subtotal = selectedItems.reduce((acc, item) => {
    return acc + (item.ProductPrice * item.quantity);
  }, 0);
   const discount = isUsingPoints ? Math.min(subtotal, userDetails?.Points || 0) : 0;
   const finalPrice = subtotal - discount;
   
  if (selectedItems.length === 0) {
    return (
      <div className="payment-page-container empty-cart-view">
        <div className="empty-cart-content animate__animated animate__fadeIn">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty!</h2>
          <p>Looks like you haven't added anything to your tech collection yet.</p>
          <button 
            onClick={() => navigate('/store')} 
            className="go-shopping-btn"
          >
            Go Shopping Now
          </button>
        </div>
      </div>
    );
  }
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
                  <button onClick={()=>dispatch(decrementQuantity(item.ProductID))}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>dispatch(incrementQuantity(item.ProductID))}>
                    <FaPlus />
                  </button>
                </div>
                <div className="item-price">
                {(Number(item.ProductPrice)) * (Number(item.quantity))} <small>EGP</small>
                </div>
                <button 
                className="remove-btn"
                onClick={()=>dispatch(removeItem(item.ProductID))}
                >
                  <FaTrash />
                </button>
              </div>
            ))} 
          </div>
        </div>
        <div className="summary-section">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-details">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{subtotal} EGP</span>
            </div>
        
            <div className="points-discount-card">
              <div className="points-info">
                <FaStar className="star-main" />
                <div>
                  <p className="p-title">Use Your Points</p>
                  <p className="p-balance">Balance: {userDetails?.Points} Pts</p>
                </div>
              </div>
             <div className="discount-action">
                <p className="discount-amt">- {discount} EGP</p>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={isUsingPoints}
                    onChange={() => dispatch(togglePointsUsage())} 
                  />
                  <span className="slider"></span>
                </label>
             </div>
            </div>
            <div className="total-line">
              <span>Total Amount</span>
              <span className="total-price">{finalPrice} EGP</span>
            </div> 
            <button className="checkout-btn">Proceed to Payment</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;