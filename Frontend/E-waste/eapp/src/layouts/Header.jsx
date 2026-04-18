import React from 'react'
import logo from './logo3.png'
import './Header.css'
import{Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import HeaderActions from './HeaderActions'
const Header = () => {
   const {token ,userDetails}=useSelector((state)=>state.auth);
    if (!token) return null;
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">
      <img src={logo} alt="" width={50} height={50} />
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
      {userDetails.Role==='Admin' && (
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/dashboard">
            Dashboard
          </Link>
        </li>
      )}
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">
            Home
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/userprofile">
             Profile
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sell-your-device">
            Sell Device
        </Link>
        </li>
          <li className="nav-item">
          <Link className="nav-link" to="/store">
            Tech Store
        </Link>
        </li>
       
         <li className="nav-item">
          <Link className="nav-link" to="/findus">
            Find Us
          </Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/contactus">
            Contact Us
          </Link>
        </li>
        {userDetails.Role==='Admin' && (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Definitions
          </Link>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
             {userDetails.Role==='Admin' && (
             <li>
              <Link className="nav-link" to="/add-categories">
               Categories
              </Link>
            </li>
            )}
             {userDetails.Role==='Admin' && (
              <li>
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>
            )}
             {userDetails.Role==='Admin' && (
              <li>
                <Link className="nav-link" to="/cartItems">
                Cart Items
                </Link>
              </li>
            )}
            {userDetails.Role==='Admin' && (
              <li>
              <Link className="nav-link" to="/points">
                  Points
              </Link>
            </li> 
            )}
            {userDetails.Role==='Admin' && (
             <li>
              <Link className="nav-link" to="/addbranches">
                  Branches
              </Link>
            </li> 
            )}
           {userDetails.Role==='Admin' && (
            <li>
              <Link className="nav-link" to="/addcontacts">
                  Contacts
              </Link>
            </li> 
            )}
          </ul>
        </li>
        )}
      </ul>
      <div className="ms-lg-auto">
          {token && <HeaderActions />}
        </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header