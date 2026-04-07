import React from 'react'
import logo from './logo3.png'
import './Header.css'
const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={logo} alt="" width={50} height={50} />
    </a>
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
         <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Login
          </a>
        </li>
         <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Register
          </a>
        </li>
         <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
             Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Sell Device
          </a>
        </li>
          <li className="nav-item">
          <a className="nav-link" href="#">
            Tech Store
          </a>
        </li>
         <li>
          <a className="nav-link" href="#">
              Points
          </a>
        </li>
         <li className="nav-item">
          <a className="nav-link" href="#">
            Find Us
          </a>
        </li>
         <li className="nav-item">
          <a className="nav-link" href="#">
            Contact Us
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Definitions
          </a>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
               Cart Items
              </a>
            </li>
           
             <li>
              <a className="dropdown-item" href="#">
                Orders
              </a>
            </li>
           
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header