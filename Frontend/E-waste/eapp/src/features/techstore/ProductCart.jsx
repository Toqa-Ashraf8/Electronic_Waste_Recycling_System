import React from "react";
import { variables } from "../../components/variables";
import {  FaPlus, FaStar } from 'react-icons/fa';
export const ProductCard = ({ product, onAddToCart ,imagePath}) => {

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
        onClick={onAddToCart}
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
            <span className="price-value">{product.Price} EGP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
};
