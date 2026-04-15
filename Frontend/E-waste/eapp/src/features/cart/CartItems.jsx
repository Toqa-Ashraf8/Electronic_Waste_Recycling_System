import React, { useEffect, useRef } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { Save, BrushCleaning, Search, Trash, ShoppingBag } from 'lucide-react';
import './CartItems.css';
import { useSelector, useDispatch } from 'react-redux';
import ProductModal from "./ProductModal";
import { 
  addNewItem, 
  editProductRow, 
  resetForm, 
  setCategory, 
  setDeleteProductIndex, 
  toggleDeleteAllModal, 
  toggleSearchModal } from "../../redux/cart/cartSlice";
import { variables } from "../../components/variables";
import DeleteProductModal from "./modals/DeleteProductModal";
import { saveProducts } from "../../services/cartService";
import {toast} from 'react-toastify'
import CartCategorySearch from "./modals/CartCategorySearch";
import CartCategoryDeleteModal from "./modals/CartCategoryDeleteModal";
function CartItems() {
  const {
    isProductModalOpen,
    productsList,
    category,
    isDeleteProModalOpen,
    isSearchModalOpen,
    isDeleteAllModalOpen,
    selectedCategoryId
  }=useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const cartIdRef = useRef();
  const cartTitleRef = useRef();

const handleChange=(e)=>{
  const {name,value}=e.target;
  dispatch(setCategory({[name]:value}));
}
const handleAddNew=()=>{
  dispatch(addNewItem((productsList.length + 1)));
}
const handleClear=()=>{
  dispatch(resetForm());
  cartTitleRef.current.focus();
}
const handleSave=async()=>{
  const params={...category,products:productsList}
   try {
    const result=await dispatch(saveProducts(params)).unwrap();
    if(result.saved){
      toast.success("Data saved Successfully !",{
        theme:"colored",
        position:"top-right"
      })
    }
    if(result.updated){
      toast.success("Data updated Successfully !",{
        theme:"colored",
        position:"top-right"
      })
    }
  } catch (error) {}
}
console.log("selectedCategoryId",selectedCategoryId)
  useEffect(() => {
    if (cartTitleRef) cartTitleRef.current.focus();
  }, []);
  return (
    <div className="cart-page-container">
      {isProductModalOpen && <ProductModal/>}
      {isDeleteProModalOpen && <DeleteProductModal/>}
      {isSearchModalOpen && <CartCategorySearch/>}
      {isDeleteAllModalOpen && <CartCategoryDeleteModal categoryId={selectedCategoryId}/>}
      <h5 className="cart-main-title"><ShoppingBag size={22} /> CART MANAGEMENT</h5>
      <div className="cart-card-wrapper animate__animated animate__fadeIn">
        <div className="cart-side-actions col">
          <button className="btn cart-action-btn" title="Clear Form" onClick={()=>handleClear()}>
            <BrushCleaning size={20} color="black" />
          </button>
          <button className="btn cart-action-btn" title="Save Cart" onClick={()=>handleSave()}>
            <Save size={20} color="green" />
          </button>
          <button className="btn cart-action-btn" title="Delete" onClick={()=>dispatch(toggleDeleteAllModal(true))}>
            <Trash size={20} color="red" />
          </button>
          <button className="btn cart-action-btn" title="Search" onClick={()=>dispatch(toggleSearchModal(true))}>
            <Search size={20} color="blue"  />
          </button>
        </div>

        <div className="cart-master-section">
          <div className="cart-inputs-row">
            <div className="cart-form-field">
              <label className="cart-label-style">Category ID</label>
              <input 
                type="text" 
                className="form-control cart-input-control"
                name="CategoryID"
                ref={cartIdRef}
                value={category.CategoryID || 0}
                disabled
              />
            </div>
            <div className="cart-form-field">
              <label className="cart-label-style">Category Name</label>
              <input 
                type="text" 
                className="form-control cart-input-control"
                name="CategoryName"
                autoComplete="off"
                ref={cartTitleRef}
                value={category.CategoryName || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <hr className="cart-dashed-divider" />
        <div className="cart-table-top">
          <button 
          className="cart-btn-primary"
          onClick={()=>handleAddNew()}
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
                  <tr key={index}>
                    <td>{product.serial}</td>
                    <td>{product.ProductName}</td>
                    <td>{product.ProductPrice}</td>
                    <td>{product.Stock}</td>
                    <td>{product.Points}</td>
                     <td>
                      <div style={{display:'flex',justifyContent:'center'}}>
                        <div className="product-img">
                          {product.ProductImagePath ? (
                            <img src= {variables.PRODUCTIMG_API+product.ProductImagePath} alt="" className="img-p" />
                           ):(
                           <div className="empty-msg" style={{
                              width: '45px', 
                              height: '40px', 
                              position: 'relative',
                              backgroundColor: '#f1f5f9', 
                              display: 'flex',           
                              alignItems: 'center',    
                              justifyContent: 'center', 
                              
                             }}>
                              <p style={{ 
                                  margin: 0, 
                                  fontSize: '10px', 
                                  color: '#d3cece',
                                  fontWeight: '600'
                              }}>
                                  No Image
                              </p> 
                          </div>
                          )}
                        
                      </div>
                      </div>
                      </td>
                    <td>{product.Description}</td> 
                    <td className="text-center">
                      <FiEdit className="cart-icon-edit" 
                      onClick={()=>dispatch(editProductRow(index))}
                       />
                      <FiTrash2 className="cart-icon-delete" 
                      onClick={()=>dispatch(setDeleteProductIndex(index))} 
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