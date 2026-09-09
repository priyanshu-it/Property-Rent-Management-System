import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ token, logout, username }) => {
  const [Menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu(prev => !prev);

  const handleNavClick = () => {
    setMenu(false);
    
    const checkbox = document.getElementById('menu-toggle');
    if (checkbox) checkbox.checked = false;
  };

  return (
    <nav>
      <input type="checkbox" id="menu-toggle" className="menu-toggle-checkbox" />
      <label htmlFor="menu-toggle" className="menu-toggle" onClick={toggleMenu}>
        {Menu ? '✖' : '☰'}
      </label>

      {!token ? (
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}><i className="fas fa-home"></i> Home</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>About-Us</NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''} style={{ textDecoration: 'underline' }} onClick={handleNavClick}>Register</NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} style={{ textDecoration: 'underline' }} onClick={handleNavClick}>Log-In</NavLink>
        </div>
      ) : (
        <>
          <div className="nav-links">
            <NavLink to="/myflats" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>My Flats</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Dashboard</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Contact-Us</NavLink>
          </div>

          <div className="user-section">
            <span className="welcome-message">
              Welcome, <strong>{username?.toUpperCase()}</strong>!
            </span>
            <button onClick={logout}><i className="fas fa-sign-out-alt"></i> Log-out</button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
// line 50