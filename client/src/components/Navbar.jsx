import React, { useState } from 'react'
import './Navbar.css'
import Logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav style={{ borderBottom: 'solid 1px #000' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: '150px', height: '150px' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>About</div>
          <div>Contact</div>
          <div>Login</div>
          <div>Register</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
