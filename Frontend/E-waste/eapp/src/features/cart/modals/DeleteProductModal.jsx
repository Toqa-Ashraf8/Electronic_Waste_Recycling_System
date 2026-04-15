import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './DeleteProductModal.css';
import { deleteProductRow, toggleDeleteProductModal } from '../../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';

const DeleteProductModal = () => {
const dispatch=useDispatch();
  return (
    <div className="modal-overlay">
      <div className="delete-modal-card animate__animated animate__zoomIn">
        <div className="modal-icon-wrapper">
          <FaExclamationTriangle />
        </div>
        
        <h3 className="modal-title">Confirm Delete</h3>
        <p className="modal-text">
          Are you sure you want to delete this row?
        </p>

        <div className="modal-actions">
          <button className="btn-cancel" 
          onClick={()=>dispatch(toggleDeleteProductModal(false))} >
            No
          </button>
          <button className="btn-confirm-delete" 
          onClick={()=>dispatch(deleteProductRow())}>
            yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;