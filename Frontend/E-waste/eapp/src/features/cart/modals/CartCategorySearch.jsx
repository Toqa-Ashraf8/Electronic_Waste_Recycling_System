import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './CartCategorySearch.css';
import { setCategoryWithProducts, toggleSearchModal } from '../../../redux/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartCategories, fetchProducts } from '../../../services/cartService';

const CartCategorySearch = () => {
const {categoriesList}=useSelector((state)=>state.cart);
const dispatch=useDispatch();

const fillForm=async(index,id)=>{
    dispatch(setCategoryWithProducts({index:index,id:id}));
    await dispatch(fetchProducts(id)); 
}

useEffect(()=>{
    dispatch(fetchCartCategories());
},[dispatch])

  return (
    <div className="cart-simple-overlay">
      <div className="cart-simple-card">
        <div className="cart-simple-header">
          <span>Categories List</span>
          <button className="cart-close-icon-btn" onClick={()=>dispatch(toggleSearchModal(false))}>
            <FiX />
          </button>
        </div>

        <div className="cart-simple-body">
          <table className="cart-mini-table cart-table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.length > 0 ? (
                categoriesList.map((cat, index) => (
                  <tr key={index} onClick={()=>fillForm(index,cat.CategoryID)}>
                    <td className="cart-id-cell">{cat.CategoryID}</td>
                    <td className="cart-name-cell">{cat.CategoryName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="cart-empty-row">
                    No categories found
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartCategorySearch;