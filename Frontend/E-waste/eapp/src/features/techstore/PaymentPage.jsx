import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus, FaTicketAlt, FaStar, FaArrowLeft } from 'react-icons/fa';
import './PaymentPage.css';

const PaymentPage = ({ onBackClick }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Motherboard Rev-3", priceEGP: 675, pointsPrice: 450, qty: 1, image: "https://via.placeholder.com/100x100/f8fafc/55a690?text=MB" },
    { id: 3, name: "Copper Coil Batch", priceEGP: 225, pointsPrice: 150, qty: 2, image: "https://via.placeholder.com/100x100/f8fafc/55a690?text=Copper" },
  ]);

  const [usePoints, setUsePoints] = useState(false);
  const userPointsBalance = 1200; 
  const pointsDiscountValue = 100; 

  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceEGP * item.qty), 0);
  const total = usePoints ? subtotal - pointsDiscountValue : subtotal;

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="payment-page-container animate__animated animate__fadeIn">
      <div className="payment-wrapper">
        <div className="cart-section">
          <button onClick={onBackClick} className="back-to-store">
            <FaArrowLeft /> Back to Store
          </button>
          <h2 className="section-title">Shopping Cart</h2>
          
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.pointsPrice} <FaStar className="star-mini" /></p>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, -1)}><FaMinus /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}><FaPlus /></button>
                </div>
                <div className="item-price">
                  {item.priceEGP * item.qty} <small>EGP</small>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}><FaTrash /></button>
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
            
            <div className={`points-discount-card ${usePoints ? 'active' : ''}`}>
              <div className="points-info">
                <FaStar className="star-main" />
                <div>
                  <p className="p-title">Use Your Points</p>
                  <p className="p-balance">Balance: {userPointsBalance} Pts</p>
                </div>
              </div>
              <div className="discount-action">
                <p className="discount-amt">-{pointsDiscountValue} EGP</p>
                <label className="switch">
                  <input type="checkbox" onChange={() => setUsePoints(!usePoints)} />
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
              <span className="total-price">{total} EGP</span>
            </div>
            
            <button className="checkout-btn">Proceed to Payment</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;