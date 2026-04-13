import React from 'react';
import './OrdersGallery.css';
import { FaCheck, FaTimes, FaSearchPlus } from 'react-icons/fa';

// مصفوفة بيانات وهمية للتجربة
const dummyOrders = [
  {
    OrderID: 101,
    DeviceImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    ItemName: 'MacBook Pro 2021',
    Condition: 'Excellent'
  },
  {
    OrderID: 102,
    DeviceImage: 'https://images.unsplash.com/photo-1591333139245-2b411c9d7b7b?w=400',
    ItemName: 'iPhone 13 Pro',
    Condition: 'Good'
  },
  {
    OrderID: 103,
    DeviceImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    ItemName: 'iPad Air 4',
    Condition: 'Fair'
  },
  {
    OrderID: 104,
    DeviceImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400',
    ItemName: 'Dell XPS 15',
    Condition: 'Scrap/Bad'
  },
  {
    OrderID: 105,
    DeviceImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    ItemName: 'HP Spectre x360',
    Condition: 'Excellent'
  },
  {
    OrderID: 106,
    DeviceImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f0158f?w=400',
    ItemName: 'Samsung Galaxy S21',
    Condition: 'Good'
  }
];

const OrdersGallery = ({ onVerify }) => {
  // استخدمنا dummyOrders بدل الـ props عشان تشوفي الشكل دلوقتي
  const orders = dummyOrders;

  return (
    <div className="gallery-container-hud">
      <div className="gallery-header">
        <h2>Quick Verification Gallery</h2>
        <p>Review device images and match them with descriptions at a glance.</p>
      </div>

      <div className="gallery-grid">
        {orders.map((order) => (
          <div key={order.OrderID} className="gallery-card">
            <div className="card-badge">#{order.OrderID}</div>
            
            <div className="image-wrapper">
              <img src={order.DeviceImage} alt={`Order ${order.OrderID}`} />
              <div className="image-overlay">
                <button className="zoom-btn" onClick={() => alert(`Zooming into Order #${order.OrderID}`)}>
                  <FaSearchPlus />
                </button>
              </div>
            </div>

            <div className="card-info">
              <span className="device-name">{order.ItemName}</span>
              <span className="device-condition">Condition: {order.Condition}</span>
            </div>

            <div className="card-actions">
              <button 
                className="action-btn approve" 
                title="Approve Match"
                onClick={() => alert(`Order ${order.OrderID} Approved`)}
              >
                <FaCheck />
              </button>
              <button 
                className="action-btn reject" 
                title="Reject Match"
                onClick={() => alert(`Order ${order.OrderID} Rejected`)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersGallery;