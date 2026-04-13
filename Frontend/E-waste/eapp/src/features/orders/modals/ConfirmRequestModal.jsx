import React from 'react';
import './ConfirmRequestModal.css';
import { FaExclamationCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleconfirmReqModal } from '../../../redux/orders/ordersSlice';

const ConfirmRequestModal = ({ message }) => {
const dispatch=useDispatch();
  return (
    <div className="confirm-overlay">
      <div className="confirm-toast animate__animated animate__fadeInDown">
        <div className="confirm-content">
          <FaExclamationCircle className="confirm-icon" />
          <span>{message || "Are you sure you want to approve this request?"}</span>
        </div>
        <div className="confirm-actions">
          <button className="confirm-btn yes-btn">Confirm</button>
          <button 
          className="confirm-btn no-btn"
           onClick={()=>dispatch(toggleconfirmReqModal(false))}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRequestModal;