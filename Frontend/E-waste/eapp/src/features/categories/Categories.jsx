import React, { useEffect, useRef } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { Save, BrushCleaning ,Search ,Trash } from 'lucide-react';
import './Categories.css'
import {useSelector,useDispatch} from 'react-redux'
import { 
  addNewItem, 
  resetCategoryForm, 
  setCategoryValues, 
  setEditItem, 
  setItemIndex, 
  toggleCategoryModal, 
  toggleDeleteCatModal, 
  toggleSearchModal 
} from "../../redux/categories/categorySlice"; 
import ItemsModal from "./ItemsModal";
import { saveAllData } from "../../services/categoryService";
import { toast } from "react-toastify";
import CategorySearchModal from "./modals/CategorySearchModal";
import DeleteCategoryModal from "./modals/DeleteCategoryModal";
import DeleteItemModal from "./modals/DeleteItemModal";
function Categories() {
const {
  category,
  isCategoryModalOpen,
  itemsList,
  item,
  isDeleteItemModalOpen,
  isSearchCatModalOpen,
  isDeleteCatModalOpen
}=useSelector((state)=>state.category);
const dispatch=useDispatch();
const catIdRef=useRef();
const catNameRef=useRef();

const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setCategoryValues({[name]:value}));
}
const clearForm=()=>{
  dispatch(resetCategoryForm());
  catIdRef.current.disabled=true;
  catNameRef.current.focus();
}
const addNew=()=>{
  dispatch(addNewItem(itemsList.length + 1));
  dispatch(toggleCategoryModal(true));
}
const saveCategory = async () => { 
  const params = { ...category, items: itemsList };
   try {
    const result = await dispatch(saveAllData(params)).unwrap(); 
    if (result.saved) {
      toast.success("Category added successfully!", {
        theme: 'colored',
        position: 'top-right'
      });
    } 
    else if (result.updated) {
      toast.success("Category details updated!", {
        theme: 'colored',
        position: 'top-right'
      });
    } 
  } catch (error) {} 
};
useEffect(()=>{
  if(category.CategoryID===0){
    clearForm();
  }
  catNameRef.current.focus();
},[])

  return (
    <div className="container">
      {isCategoryModalOpen && <ItemsModal/>}
       {isDeleteItemModalOpen && <DeleteItemModal/>}
      {isSearchCatModalOpen && <CategorySearchModal/>}
      {isDeleteCatModalOpen && <DeleteCategoryModal/>}        
      <h5 className="black-bold-title"> CATEGORY MANAGEMENT</h5>
      <div className="sell-waste-card-hud animate__animated animate__fadeIn">
         <div className="btns-container col">
                <button 
                className="btn btn-cat"
                onClick={()=>clearForm()}
                >
                  <BrushCleaning size={20} color="black"/>
                </button>
                <button 
                className="btn btn-cat" 
                onClick={()=>saveCategory()}>
                  <Save size={20} color="green"/>
                </button>
                <button className="btn btn-cat"
                onClick={()=>dispatch(toggleDeleteCatModal(true))}
                 >
                  <Trash size={20} color="red"/>
                </button>
                <button className="btn btn-cat"
                onClick={()=>dispatch(toggleSearchModal(true))}
                >
                  <Search size={20} color="blue"/>
                </button>
          </div>
        <div className="master-add-section">  
          <div className="inputs-inline-row">
            <div className="form-Data">
              <label className="label-bold">Category ID</label>
              <input 
              type="text" 
              className="form-control inpData"
              ref={catIdRef}
              value={category.CategoryID || 0}
              />
            </div>
            <div className="form-Data">
              <label className="label-bold">Category Name</label>
              <input 
              type="text" 
              className="form-control inpData"
              name="CategoryName"
              autoComplete="off"
              ref={catNameRef}
              value={category.CategoryName || ""}
              onChange={handleChange}
              required
              />
            </div>
          </div>
        </div>
        <hr className="divider-hud" />

        <div className="table-header-actions">
         <button className="btn-add-item-hud" onClick={() => addNew()}>
          <FiPlus size={18} /> 
          <span>ADD NEW ITEM</span>
        </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="custom-table-header">
              <tr>
                <th>Serial</th>
                <th>Item Name</th>
                <th>Brand</th>
                <th>Quality</th>
                <th>Condition</th>
                <th>Estimted Price</th>
                <th>Actions</th>
              </tr>
            </thead>
           {itemsList.length > 0 ? (
                <tbody>
                  {itemsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.serial}</td>
                      <td>{item.ItemName}</td>
                      <td>{item.BrandName}</td>
                      <td>{item.Condition}</td>
                      <td>{item.Quality}</td>
                      <td>{item.EstimatedPrice}EGP</td>
                      <td className="text-center">
                        <FiEdit className="action-icon edit" 
                        onClick={()=>dispatch(setEditItem(index))} />
                        <FiTrash2 className="action-icon delete" 
                        onClick={()=>dispatch(setItemIndex(index))} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                 ) : (
                <tbody>
                  <tr>
                    <td colSpan={7} className="empty-msg">
                      No Items Added Yet
                    </td>
                  </tr>
                </tbody>
              )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categories;