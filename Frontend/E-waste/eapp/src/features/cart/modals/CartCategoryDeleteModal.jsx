import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './CartCategoryDeleteModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeleteAllModal } from '../../../redux/cart/cartSlice';
import { deleteAll } from '../../../services/cartService';
import { toast } from 'react-toastify';

const CartCategoryDeleteModal = ({categoryId}) => {
    const {selectedCategoryId}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();

const handleDelete=async()=>{
    try {
        const result=await dispatch(deleteAll(selectedCategoryId)).unwrap();
        if(result.deleted){
            toast.error("Data deleted !",{
                theme:'colored',
                position:'top-right'
            })
        }
    } catch (error) {
        dispatch(toggleDeleteAllModal(false));
    }
}
  return (
    <div className="cart-del-overlay">
      <div className="cart-del-card animate__animated animate__zoomIn">
        <div className="cart-del-icon-box">
          <FaExclamationTriangle />
        </div>
        
        <h3 className="cart-del-title">Confirm Delete</h3>
        <p className="cart-del-text">
         <div>Are you sure you want to delete this category? </div> 
        </p>

        <div className="cart-del-actions">
          <button className="cart-del-btn-cancel" onClick={()=>dispatch(toggleDeleteAllModal(false))} >
            Cancel
          </button>
          <button className="cart-del-btn-confirm" onClick={()=>handleDelete()}>
            Delete 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCategoryDeleteModal;