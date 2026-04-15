import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import 'animate.css';
import './TechStore.css';
import { FaShoppingCart, FaPlus, FaStar} from 'react-icons/fa';
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => (
   
  <div className="product-card-quantum">
    <div className="product-image-container">
      <div className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
        {product.stock > 0 ? `${product.stock} Units` : 'Sold Out'}
      </div>
      <img src={product.image} alt={product.name} className="product-image" />
      <button 
        className="add-to-cart-button" 
        disabled={product.stock === 0} 
        onClick={onAddToCart}
      >
        <FaPlus />
      </button>
    </div>

    <div className="product-info">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      
      <div className="product-meta">
        <div className="price-wrapper">
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
                 <span className="points-value">{product.points}</span>
                <span><FaStar size={25} color='#fdf511'/></span>
            </div>
          <div>
          <span className="price-value">{product.price} EGP</span>
         </div>
        </div>
      </div>
    </div>
  </div>
);

const TechStore = ({ onBackClick }) => {
  const [cartCount, setCartCount] = useState(5); 
   const navigate=useNavigate();
  const dummyProducts = [
    { id: 1, name: "Motherboard Rev-3", price:10000,points: 450, stock: 12, description: "High-quality circuits extracted from server-grade hardware.", image: "https://via.placeholder.com/300x300/f8fafc/55a690?text=Motherboard" },
    { id: 2, name: "Graphic Unit X",price:20000, points: 800, stock: 0, description: "Salvaged GPU components for secondary industrial use.", image: "https://via.placeholder.com/300x300/f8fafc/55a690?text=GPU+Unit" },
    { id: 3, name: "Copper Coil Batch",price:30000, points: 150, stock: 45, description: "Pure copper extracted from recycled power adapters.", image: "https://via.placeholder.com/300x300/f8fafc/55a690?text=Copper" },
    { id: 4, name: "Silicon Wafers", price:40000,points: 1200, stock: 5, description: "Rare earth elements recovered from smartphone processors.", image: "https://via.placeholder.com/300x300/f8fafc/55a690?text=Silicon" }
  ];

  const handleAddToCart = () => setCartCount(prev => prev + 1);

  return (
    <div className="store-page-quantum">
      <div className="content-wrapper-quantum">
    
        <div className="page-header-quantum">
          <div className="header-left-side">
            <FiRefreshCw className="header-spin-icon" />
            <h1 className="header-title">SECOND-LIFE CIRCUITS</h1>
          </div>
          
          <div className="header-right-side">
           
            <div className="cart-container-minimal">
              <FaShoppingCart size={24}  onClick={()=>navigate('/payment')}/>
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </div>
          </div>
        </div>

        <div className="products-grid-quantum">
          {dummyProducts.map((product, index) => (
            <Col 
              key={product.id} 
              className="animate__animated animate__fadeInUp" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStore;