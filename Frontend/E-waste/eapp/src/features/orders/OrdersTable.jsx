import React from 'react';
import { FaStar, FaTruck, FaBoxOpen, FaCoins } from 'react-icons/fa';

export const OrdersTable = ({ ordersList, zoomDeviceImage, variables }) => {
  return (
    <div className="table-responsive">
      <table className="bootstrap-table">
        <thead>
          <tr>
            <th>ReqID</th>
            <th>Customer</th>
            <th>Device</th>
            <th>Condition/Quality</th>
            <th>Expected Points</th>
            <th style={{ width: '100px' }}>Image</th>
            <th>PickUp Date</th>
            <th>Current Status</th>
            <th>Actions/Steps</th>
          </tr>
        </thead>
        <tbody>
          {ordersList && ordersList.map((order, index) => (
            <tr key={order.RequestID || index}>
              <td>{order.RequestID}</td>
              <td><strong>{order.UserName}</strong></td>
              <td>{order.DeviceItem}</td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span>{order.DeviceCondition}/</span>
                  <span>{order.DeviceQuality}</span>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                  <span>{order.Points}</span>
                  <FaStar size={20} color="#fbff03" style={{ marginTop: '-3px' }} />
                </div>
              </td>
              <td>
                <div className="img-container" onClick={() => zoomDeviceImage(index)}>
                  <img src={variables.DEVICEIMG_API + order.DeviceImagePath} alt="" className="dev-img" />
                </div>
              </td>
              <td>{order.PickUpDate?.split('T')[0]}</td>
              <td>
                {/* Status Badges */}
                {order.OrderStatus === 1 && <StatusBadge text="Accepted" color="#016d35" bg="#ebffedf8" dot="#23bf6c" border="#d6ffe6" />}
                {order.OrderStatus === 3 && <StatusBadge text="Dispatched" color="#56016d" bg="#feebfff8" dot="#f4d0ff" border="#f7d6ff" />}
                {order.OrderStatus === 4 && <StatusBadge text="Received" color="#005a8d" bg="#e6f6ff" dot="#4db8ff" border="#b3e5ff" />}
              </td>
              <td>
                {/* Action Buttons */}
                {order.OrderStatus === 1 && (
                  <button className="btn-workflow btn-dispatch" title="Dispatch Courier">
                    <FaTruck /> <span>Dispatch Courier</span>
                  </button>
                )}
                {order.OrderStatus === 3 && (
                  <button className="btn-workflow btn-received" title="Mark as Received">
                    <FaBoxOpen /> <span>Mark as Received</span>
                  </button>
                )}
                {order.OrderStatus === 4 && (
                  <button className="btn-workflow btn-points" title="Send Points">
                    <FaCoins /> <span>Send Points</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Component صغير داخلي عشان م نكررش كود الـ Styles بتاعة الـ Status
const StatusBadge = ({ text, color, bg, dot, border }) => (
  <span style={{
    backgroundColor: bg, color: color, padding: '4px 12px', borderRadius: '12px',
    fontSize: '0.8rem', fontWeight: '600', border: `1px solid ${border}`,
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    textTransform: 'uppercase', letterSpacing: '0.5px'
  }}>
    <span style={{ width: '6px', height: '6px', backgroundColor: dot, borderRadius: '50%' }}></span>
    {text}
  </span>
);