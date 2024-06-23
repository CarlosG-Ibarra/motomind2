import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login?action=login'); // Navigate with action parameter for login
  };

  const handleRegisterClick = () => {
    navigate('/login?action=register'); // Navigate with action parameter for register
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="company-name-link">
          <h1 className="company-name">MotoMind</h1>
        </a>
        <nav className="nav-links">
          <a href="/">Inicio</a>
          <a href="/about">Nosotros</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
      <div className="header-right">
        <a href="/login?action=register" className="register-link" onClick={handleRegisterClick}>Registrate</a>
        <button className="login-button" onClick={handleLoginClick}>Log In</button>
      </div>
    </header>
  );
};

export default Header;
