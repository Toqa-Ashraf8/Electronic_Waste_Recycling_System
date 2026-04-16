import React from "react";
import { variables } from "../../components/variables";
import {  FaPlus, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { addItem, setCartCount } from "../../redux/TechStore/storeSlice";
export const ProductCard = ({ product ,imagePath}) => {
  const dispatch=useDispatch();

const addToCart=(product,id)=>{
  dispatch(addItem({product:product,id:id}))
  dispatch(setCartCount(product))
}
return(
  <div className="product-card-quantum">
    <div className="product-image-container">
      <div className={`stock-badge ${product.Stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
        {product.Stock > 0 ? `${product.Stock} Units` : 'Sold Out'}
      </div>
      <img src={variables.PRODUCTIMG_API+imagePath} className="product-image" />
      <button 
        className="add-to-cart-button" 
        disabled={product.Stock === 0}
        onClick={()=>addToCart(product,product.ProductID)}
      >
        <FaPlus />
      </button>    
    </div>
    <div className="product-info">
      <h3 className="product-name">{product.ProductName}</h3>
      <p className="product-description">{product.Description}</p>
      
      <div className="product-meta">
        <div className="price-wrapper">
          <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
            <span className="points-value">{product.Points}</span>
            <span><FaStar size={25} color='#fdf511'/></span>
          </div>
          <div>
            <span className="price-value">{product.ProductPrice} EGP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
};
