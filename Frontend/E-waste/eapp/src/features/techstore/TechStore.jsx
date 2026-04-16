import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import 'animate.css';
import './TechStore.css';
import { 
  FaShoppingCart, 
  FaPlus, 
  FaStar,
  FaSearch 
} from 'react-icons/fa';
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCartCategories, 
  fetchCartProducts, 
  fetchProductsByCat 
} from '../../services/storeService';
import { ProductCard } from './ProductCart';
import { setSelectedCategory } from '../../redux/TechStore/storeSlice';

const TechStore = ({ onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const {
    cartProducts,
    categories,
    selectedCategory,
    cartCount,
    selectedItems
}=useSelector((state)=>state.store);
  const dispatch=useDispatch(); 

  const fetchAll=()=>{
    dispatch(setSelectedCategory('All'));
    dispatch(fetchProductsByCat(0));
  }
const fetchByCategory=async(cat)=>{
  const selectedCat=categories.find(c=>c.CategoryID ===parseInt(cat.CategoryID));
  dispatch(setSelectedCategory(cat.CategoryName));
  dispatch(fetchProductsByCat(selectedCat.CategoryID)); 
}


console.log(selectedItems)

  useEffect(()=>{
    const loadData=async()=>{
      await Promise.all[(
        dispatch(fetchCartProducts()).unwrap(),
        dispatch(fetchCartCategories()).unwrap()
      )]
    }
    loadData();
  },[dispatch])

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
              <FaShoppingCart size={24} onClick={() => navigate('/payment')} />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </div>
          </div>
        </div>

        <div className="filter-container-quantum">
          <div className="search-box-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-field"
            />
          </div>

          <div className="category-buttons-group">
            <button 
            onClick={() =>fetchAll()}
            className={`filter-btn ${selectedCategory === 'All'  ? 'active' : ''}`}
            >All</button>
            {categories.map((cat) => (
              <button 
                key={cat.CategoryID}
                onClick={() =>fetchByCategory(cat) }
                className={`filter-btn ${selectedCategory === cat.CategoryName  ? 'active' : ''}`}
              >
                {cat.CategoryName.charAt(0).toUpperCase()+ cat.CategoryName.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid-quantum">
          {cartProducts.length > 0 ? (
            cartProducts.map((product, index) => (
              <Col 
                key={product.ProductID} 
                className="animate__animated animate__fadeInUp" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard 
                product={product} 
                imagePath={product.ProductImagePath} 
                />
              </Col>
            ))
          ) : (
            <div className="no-results-msg">No products match your search</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStore;