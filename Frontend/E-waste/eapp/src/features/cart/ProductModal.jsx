import React, { useEffect, useRef } from 'react'
import './ProductModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { setProduct, setProductList, toggleProductModal } from '../../redux/cart/cartSlice';
import { saveProductImage } from '../../services/cartService';
import { variables } from '../../components/variables';
const ProductModal = () => {
    const {product,productImg}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const fileInputRef = useRef();
    const productRef=useRef();
    const handleButtonClick = (e) => {
    fileInputRef.current.click(); 
   };
    const handleImageUpload=async(e)=>{
    const { name } = e.target;
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    const fileName = file.name;
    formData.append("pFile", file, fileName);
    await dispatch(saveProductImage(formData));
    dispatch(setProduct({[name]:fileName }));
   }
    const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setProduct({[name]:value}));
   }
 useEffect(()=>{
    productRef.current.focus();
  },[])
  console.log("product",product);
return (
    <div>
        <div className="modalp">
            <div className="modalcntp">
                <div className="headerp">
                  <h3 
                  className='headerp_title'
                  style={{marginLeft:'40%',marginTop:'10px'}}
                  >Add Products</h3>
                  <span 
                  className='btnp_close'
                  onClick={()=>dispatch(toggleProductModal(false))}
                  >&times;</span>
                </div>
                <div className="bodyp">
                    <div className="row">
                    <div className="col-7">
                        <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>serial</label>
                                <input 
                                type="text" 
                                className="form-control inpProduct"
                                autoComplete='off'
                                name='serial'
                                value={product.serial}
                                disabled
                                />
                            </div>
                                <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>Product Name</label>
                                <input 
                                type="text" 
                                className="form-control inpProduct"
                                name='ProductName'
                                autoComplete='off'
                                ref={productRef}
                                value={product.ProductName||""}
                                onChange={handleChange}
                                />
                            </div>
                             <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>Price</label>
                                <input 
                                type="text" 
                                className="form-control inpProduct"
                                name='ProductPrice'
                                autoComplete='off'
                                value={product.ProductPrice||""}
                                onChange={handleChange}
                                />
                            </div>
                             <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>Stock</label>
                                <input 
                                type="text" 
                                className="form-control inpProduct"
                                name='Stock'
                                autoComplete='off'
                                value={product.Stock||""}
                                onChange={handleChange}
                                />
                            </div>
                             <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>Points</label>
                                <input 
                                type="text" 
                                className="form-control inpProduct"
                                name='Points'
                                autoComplete='off'
                                value={product.Points||""}
                                onChange={handleChange}
                                />
                            </div>
                             <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>Description</label>
                                <input 
                                type="text" 
                                className="form-control inpProduct"
                                name='Description'
                                autoComplete='off'
                                value={product.Description||""}
                                onChange={handleChange}
                                />
                            </div> 
                            <div className="pData">
                                <label htmlFor="" className='form-label lblProduct'>Product Image</label>
                                <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                name="ProductImagePath"
                                onChange={handleImageUpload}
                            />
                            <button 
                                type="button" 
                                className="custom-file-label-btn" 
                                onClick={handleButtonClick}
                            >       
                                <span className="file-name-placeholder">Choose Product Image</span>
                            </button>
                            </div>
                     </div>
                    <div className="col-5">
                        <div className="productimg_container">
                            {productImg ? 
                            (<img src={variables.PRODUCTIMG_API+productImg} alt="" />)
                            :<div style={{color:'#d0d0d0'}}>No Image Added</div>
                            }
                            
                        </div>
                    </div>
                 </div>
                </div>
                <div className="footerp">
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                     <button 
                     className='btn' 
                     style={{color:'#fff',backgroundColor:'#03071e'}}
                     onClick={()=>dispatch(setProductList())}
                     >Add</button>
                     <button
                      className='btn btn-danger'
                      onClick={()=>dispatch(toggleProductModal(false))}
                     >Close</button>  
                </div>
                </div>    
            </div>
        </div>
    </div>
  )
}

export default ProductModal