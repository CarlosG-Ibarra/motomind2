import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="company-name">MotoMind</h1>
        <nav className="nav-links">
          <a href="/sober">Nosotros</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
      <div className="header-right">
        <a href="/register" className="register-link">Registrate</a>
        <button className="login-button">Log In</button>
      </div>
    </header>
  );
};

export default Header;
