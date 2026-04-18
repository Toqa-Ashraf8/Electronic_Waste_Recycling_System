import React, { useEffect, useRef } from 'react'
import './ItemsModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setFormMode, 
  setItemValues, 
  setQualityAutomatically, 
  toggleCategoryModal 
} from '../../redux/categories/categorySlice';
const ItemsModal = () => {
  const {item}=useSelector((state)=>state.category);
  const dispatch=useDispatch();
  const nameRef=useRef(); 
  const priceRef=useRef();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setItemValues({[name]:value}));
    if(e.target.name==='Condition'){
      dispatch(setQualityAutomatically(e.target.value));
      priceRef.current.focus();
    }
  }
  const addToTable=()=>{
    dispatch(setFormMode());
  }
  useEffect(()=>{
    if(nameRef){
      nameRef.current.focus();
    }
  },[])

  return (
    <div>
        <div className="modalI">
            <div className="modalcnt">
                <div className="headerI">
                  <h3 
                  className='header_title'
                  style={{marginLeft:'40%',marginTop:'10px'}}
                  >Add Item</h3>
                  <span 
                  className='btn_close'
                  onClick={()=>dispatch(toggleCategoryModal(false))}
                  >&times;</span>
                </div>
                <div className="bodyI">
                  <div className="mdlData">
                    <label htmlFor="" className='form-label lblMdl'>serial</label>
                    <input 
                    type="text" 
                    className="form-control inpMdl"
                    autoComplete='off'
                    name='serial'
                    value={item.serial}
                    onChange={handleChange}
                    disabled
                    />
                  </div>
                    <div className="mdlData">
                    <label htmlFor="" className='form-label lblMdl'>Item Name</label>
                    <input 
                    type="text" 
                    className="form-control inpMdl"
                    name='ItemName'
                    autoComplete='off'
                    value={item.ItemName || ""}
                    onChange={handleChange}
                    ref={nameRef}
                    />
                  </div>
                    <div className="mdlData">
                    <label htmlFor="" className='form-label lblMdl'>Brand</label>
                    <input 
                    type="text" 
                    className="form-control inpMdl"
                    name='BrandName'
                    autoComplete='off'
                    value={item.BrandName || ""}
                    onChange={handleChange}
                    />
                  </div>
                    <div className="mdlData">
                    <label htmlFor="" className='form-label lblMdl'>Condition</label>
                    <select 
                    className="form-select inpMdl"
                    name='Condition'
                    autoComplete='off'
                    value={item.Condition || ""} 
                    onChange={handleChange}
                    >
                      <option value="-1">- select condition -</option>
                      <option value="Scrap/Bad">Scrap/Bad</option>
                      <option value="Fair">Fair</option>
                      <option value="Good">Good</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div> 
                    <div className="mdlData">
                    <label htmlFor="" className='form-label lblMdl'>Quality</label>
                    <input 
                    type="text"
                    className="form-control inpMdl"
                    name='Quality'
                    autoComplete='off'
                    value={item.Quality || ""}
                    onChange={handleChange}
                    />
                  </div>
                   
                  <div className="mdlData">
                    <label htmlFor="" className='form-label lblMdl'>Estimated Price</label>
                    <input 
                    type="text" 
                    className="form-control inpMdl"
                    name='EstimatedPrice'
                    ref={priceRef}
                    autoComplete='off'
                    value={item.EstimatedPrice || ""}
                    onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="footerI">
              
                     <button 
                     className='btn' 
                     style={{color:'#fff',backgroundColor:'#03071e'}}
                     onClick={()=>addToTable()}
                     >Add</button>
                     <button className='btn btn-danger'>Close</button>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemsModal