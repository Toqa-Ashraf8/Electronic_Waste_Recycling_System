import React, { useEffect, useRef } from "react";
import { FiPlus, FiTrash2, FiEdit, FiShoppingCart } from "react-icons/fi";
import { Save, BrushCleaning, Search, Trash, ShoppingBag } from 'lucide-react';
import './CartItems.css';
import { useSelector, useDispatch } from 'react-redux';
import ProductModal from "./ProductModal";
import { addNewItem, toggleProductModal } from "../../redux/cart/cartSlice";

function CartItems() {
  const {isProductModalOpen,productsList}=useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const cartIdRef = useRef();
  const cartTitleRef = useRef();

  useEffect(() => {
    if (cartTitleRef.current) cartTitleRef.current.focus();
  }, []);
  return (
    <div className="cart-page-container">
      {isProductModalOpen && <ProductModal/>}
      <h5 className="cart-main-title"><ShoppingBag size={22} /> CART MANAGEMENT</h5>
      <div className="cart-card-wrapper animate__animated animate__fadeIn">
        <div className="cart-side-actions col">
          <button className="btn cart-action-btn" title="Clear Form">
            <BrushCleaning size={20} color="black" />
          </button>
          <button className="btn cart-action-btn" title="Save Cart">
            <Save size={20} color="green" />
          </button>
          <button className="btn cart-action-btn" title="Delete All">
            <Trash size={20} color="red" />
          </button>
          <button className="btn cart-action-btn" title="Search">
            <Search size={20} color="blue" />
          </button>
        </div>

        <div className="cart-master-section">
          <div className="cart-inputs-row">
            <div className="cart-form-field">
              <label className="cart-label-style">Category ID</label>
              <input 
                type="text" 
                className="form-control cart-input-control"
                ref={cartIdRef}
                readOnly
              />
            </div>
            <div className="cart-form-field">
              <label className="cart-label-style">Category Name</label>
              <input 
                type="text" 
                className="form-control cart-input-control"
                name="CartDescription"
                autoComplete="off"
                ref={cartTitleRef}
                required
              />
            </div>
          </div>
        </div>
        <hr className="cart-dashed-divider" />
        <div className="cart-table-top">
          <button 
          className="cart-btn-primary"
          onClick={()=>dispatch(addNewItem((productsList.length+1)))}
          >
            <FiPlus size={18} /> 
            <span>ADD NEW PRODUCT</span>
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="cart-table-head">
              <tr>
                <th>Serial</th>
                <th>Product Name</th>
                <th>ProductPrice</th>
                <th>Stock</th>
                <th>Points</th>
                <th>Image</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsList.length>0 ? 
              (productsList.map((product,index)=>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <FiEdit className="cart-icon-edit" 
                         />
                      <FiTrash2 className="cart-icon-delete" 
                        />
                    </td>
                  </tr> 
                  )) : 
                (<tr>
                  <td colSpan={8} className="cart-empty-row">
                    Your cart is currently empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartItems;