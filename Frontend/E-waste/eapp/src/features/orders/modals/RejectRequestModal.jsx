import React, { useState } from 'react';
import './RejectRequestModal.css';
import { FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setRejectNote, toggleRejectReqModal } from '../../../redux/orders/ordersSlice';
import { fetchOrders, saveOrders } from '../../../services/ordersService';
import { toast } from 'react-toastify';

const RejectRequestModal = () => {
  const {order}=useSelector((state)=>state.orders);
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setRejectNote({[name]:value}));
  }
  const handleSave=()=>{
   try {
      const result=dispatch(saveOrders(order)).unwrap();
        toast.success("Status updated",{
          theme:'colored',
          position:'top-right'
        })
      
    } catch (error) {
      dispatch(toggleRejectReqModal(false))
    }
}
  return (
    <div className="reject-overlay">
      <div className="reject-card animate__animated animate__fadeInDown">
        <div className="reject-header">
          <FaTimesCircle 
          className="reject-icon"/>
          <span>Reject Order</span>
        </div>
        
        <div className="reject-body">
          <p>Are you sure you want to reject this request?</p>
          <textarea 
            name='Notes'
            value={order.Notes || ""}
            onChange={handleChange}
            className="reject-input" 
          />
        </div>

        <div className="reject-actions">
          <button 
          className="reject-confirm-btn"
          onClick={()=>handleSave()}
          >Confirm Rejection</button>
          <button 
          className="reject-cancel-btn"
          onClick={()=>dispatch(toggleRejectReqModal(false))}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RejectRequestModal;