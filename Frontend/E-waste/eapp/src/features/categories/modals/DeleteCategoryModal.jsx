import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './DeleteCategoryModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteCategory } from '../../../services/categoryService';
import { resetCategoryForm, toggleDeleteCatModal } from '../../../redux/categories/categorySlice';

const DeleteCategoryModal = () => {
    const {category}=useSelector((state)=>state.category);
    const dispatch=useDispatch();

const confirmDelete=async()=>{
    try {
        const result=await dispatch(deleteCategory(category.CategoryID)).unwrap();
            if(result.deleted){
                toast.error("Category deleted successfully!", {
                    theme: 'colored',
                    position: 'top-right',                
                    autoClose: 2000,
                });
            } 
        dispatch(toggleDeleteCatModal(false));
        dispatch(resetCategoryForm());
    } catch (error) { dispatch(toggleDeleteCatModal(false)); }
}

  return (
    <div className="mini-modal-overlay">
      <div className="mini-modal-card">
        <div className="mini-modal-body">
          <FiAlertTriangle className="warning-icon-small" />
          <h3>Confirm Delete</h3>
          <p>
            Are you sure you want to delete this Category? 
          </p>
        </div>
        <div className="mini-modal-footer">
          <button className="btn-no" onClick={()=>dispatch(toggleDeleteCatModal(false))}>No</button>
          <button className="btn-yes" onClick={()=>confirmDelete()}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;