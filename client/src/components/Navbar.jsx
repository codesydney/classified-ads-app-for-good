import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Logo from '../assets/logo.jpeg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Logo} alt="logo" className="navbar-logo" />
      </Link>
      <div className="navbar-menu">
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/contact" className="navbar-link">
          Contact
        </Link>
        <Link to="/signin">
          <button className="navbar-button login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="navbar-button register">Register</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
