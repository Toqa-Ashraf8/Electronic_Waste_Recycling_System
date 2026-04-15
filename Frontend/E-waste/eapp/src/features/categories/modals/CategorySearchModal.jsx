import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './CategorySearchModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { fillCategoryForm, toggleSearchModal } from '../../../redux/categories/categorySlice';
import { fetchCategories, fetchItems } from '../../../services/categoryService';

const CategorySearchModal = () => {
const {categories}=useSelector((state)=>state.category);
const dispatch=useDispatch();

useEffect(()=>{
  dispatch(fetchCategories());
},[])
const fillForm=async(index)=>{
  const categoryId=categories[index].CategoryID;
  await dispatch(fillCategoryForm(index));
  await dispatch(fetchItems(categoryId)); 
}
  return (
    <div className="simple-modal-overlay" >
      <div className="simple-modal-card" >
        <div className="simple-modal-header">
          <span>Categories List</span>
          <button 
          className="close-btn"
          onClick={()=>dispatch(toggleSearchModal(false))}
          ><FiX /></button>
        </div>
        <div className="simple-modal-body">
          <table className="mini-table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat,index) => (
                  <tr key={index} onClick={()=>fillForm(index)}>
                    <td className="id-cell">{cat.CategoryID}</td>
                    <td className="name-cell">{cat.CategoryName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="empty-row">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategorySearchModal;