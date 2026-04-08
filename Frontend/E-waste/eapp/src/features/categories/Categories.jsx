import React from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { Save, BrushCleaning ,Search ,Trash } from 'lucide-react';
import './Categories.css'
import {useSelector,useDispatch} from 'react-redux'
import { setCategoryValues } from "../../redux/categories/categorySlice";
function Categories() {
const {category}=useSelector((state)=>state.category);
const dispatch=useDispatch();

const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setCategoryValues({[name]:value}));
}

  return (
    <div className="container">
        <h5 className="black-bold-title"> CATEGORY MANAGEMENT</h5>
      <div className="sell-waste-card-hud animate__animated animate__fadeIn">
         
         <div className="btns-container col">
                <button className="btn btn-cat"><BrushCleaning size={20} color="black"/></button>
                <button className="btn btn-cat"><Save size={20} color="green"/></button>
                 <button className="btn btn-cat"><Trash size={20} color="red"/></button>
                <button className="btn btn-cat"><Search size={20} color="blue"/></button>
            </div>
        <div className="master-add-section">  
          <div className="inputs-inline-row">
            <div className="form-Data">
              <label className="label-bold">Category ID</label>
              <input type="text" className="form-control inpData"/>
            </div>
            <div className="form-Data">
              <label className="label-bold">Category Name</label>
              <input 
              type="text" 
              className="form-control inpData"
              name="CategoryName"
              autoComplete="off"
              value={category.CategoryName}
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
          style={{padding: '10px 20px',backgroundColor:'teal',color:'#fff'}}>
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
            <tbody>
          {/*     <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-center">
                  <FiEdit className="action-icon edit" />
                  <FiTrash2 className="action-icon delete" />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categories;