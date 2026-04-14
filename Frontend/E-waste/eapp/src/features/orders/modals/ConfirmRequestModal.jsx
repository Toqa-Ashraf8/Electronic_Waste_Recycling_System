import React from 'react';
import './ConfirmRequestModal.css';
import { FaExclamationCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleconfirmReqModal } from '../../../redux/orders/ordersSlice';
import { fetchOrders, saveOrders } from '../../../services/ordersService';
import { toast } from 'react-toastify';

const ConfirmRequestModal = ({ message }) => {
  const {order}=useSelector((state)=>state.orders);
const dispatch=useDispatch();

const handleSave=()=>{
 try {
    const result=dispatch(saveOrders(order)).unwrap();
      toast.success("Status updated",{
        theme:'colored',
        position:'top-right'
      })
  
  } catch (error) {
    dispatch(toggleconfirmReqModal(false))
  }
}
  return (
    <div className="confirm-overlay">
      <div className="confirm-toast animate__animated animate__fadeInDown">
        <div className="confirm-content">
          <FaExclamationCircle className="confirm-icon" />
          <span>{message || "Are you sure you want to approve this request?"}</span>
        </div>
        <div className="confirm-actions">
          <button 
          className="confirm-btn yes-btn"
          onClick={()=>handleSave()}
          >Confirm</button>
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