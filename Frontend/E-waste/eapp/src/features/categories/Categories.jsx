import React, { useRef } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { Save, BrushCleaning ,Search ,Trash } from 'lucide-react';
import './Categories.css'
import {useSelector,useDispatch} from 'react-redux'
import { addNewItem, resetCategoryForm, setCategoryValues, toggleCategoryModal } from "../../redux/categories/categorySlice";
import ItemsModal from "./ItemsModal";
function Categories() {
const {
  category,
  isCategoryModalOpen,
  itemsList
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

  return (
    <div className="container">
      {isCategoryModalOpen && <ItemsModal/>}
        <h5 className="black-bold-title"> CATEGORY MANAGEMENT</h5>
      <div className="sell-waste-card-hud animate__animated animate__fadeIn">
         <div className="btns-container col">
                <button 
                className="btn btn-cat"
                onClick={()=>clearForm()}
                >
                  <BrushCleaning size={20} color="black"/>
                </button>
                <button className="btn btn-cat"><Save size={20} color="green"/></button>
                 <button className="btn btn-cat"><Trash size={20} color="red"/></button>
                <button className="btn btn-cat"><Search size={20} color="blue"/></button>
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
          <button 
          className="btn-action" 
          style={{padding: '10px 20px',backgroundColor:'teal',color:'#fff'}}
          onClick={()=>addNew()}>
            <FiPlus /> 
            ADD NEW ITEM
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
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
            {itemsList && itemsList.length>0 ? 
            itemsList.map((item,index)=>{
            <tbody>
              <tr>
                <td>{item.serial}</td>
                <td>{item.ItemName}</td>
                <td>{item.BrandName}</td>
                <td>{item.Condition}</td>
                <td>{item.Quality}</td>
                <td>{item.EstimatedPrice}</td>
                <td className="text-center">
                  <FiEdit className="action-icon edit" />
                  <FiTrash2 className="action-icon delete" />
                </td>
              </tr>
             </tbody>  
             })
            : 
             <td colSpan={7} className="empty-msg">No Items Added Yet</td>
            }
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categories;