import React from 'react';
import { FiTrash2, FiAlertCircle } from 'react-icons/fi'; 
import './DeleteItemModal.css';
import { useDispatch } from 'react-redux';
import { deleteItem, toggleDeleteItemModal } from '../../redux/categories/categorySlice';

const DeleteItemModal = () => {
const dispatch=useDispatch();
  return (
    <div className="modal-overlay">
      <div className="delete-modal-card">
        <div className="modal-header">
          <div className="warning-icon-wrapper">
            <FiAlertCircle className="warning-icon" />
          </div>
        </div>
        <div className="modal-body">
          <h3>Confirm Delete</h3>
          <p>
            Are you sure you want to delete this Item? 
          </p>
        </div>
        <div className="modal-footer">
             <button className="btn-danger" onClick={()=>dispatch(deleteItem())}>
            Yes
          </button>
          <button className="btn-secondary" onClick={()=>dispatch(toggleDeleteItemModal(false))}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;