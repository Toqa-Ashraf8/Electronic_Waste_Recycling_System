import React from 'react';
import { FaStar, FaExclamationTriangle } from 'react-icons/fa';

export const RejectedOrdersTable = ({ rejectedList, zoomDeviceImage, variables }) => {
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
            <th>Reason Of Rejection</th>
          </tr>
        </thead>
        <tbody>
          {rejectedList.length>0 ?  (rejectedList.map((order, index) => (
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
                  <img 
                    src={variables.DEVICEIMG_API + order.DeviceImagePath} 
                    alt="" 
                    className="dev-img" 
                  />
                </div>
              </td>
              <td>{order.PickUpDate?.split('T')[0]}</td>
              <td>
                <span style={{
                  backgroundColor: '#ffebebf8',
                  color: '#ac0808',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: '1px solid #ffd6d6',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#bf2323',
                    borderRadius: '50%'
                  }}></span>
                  Rejected
                </span>
              </td>
              <td>
                <div className="rejection-note-container" title={order.Notes}>
                  <FaExclamationTriangle className="note-icon" />
                  <span className="note-text">{order.Notes}</span>
                </div>
              </td>
            </tr>
          ))):(
             <tr>
                  <td colSpan={9} className="empty-msg">
                      No Rejected Orders 
                    </td>
                  </tr>
                )}
        </tbody>
      </table>
    </div>
  );
};