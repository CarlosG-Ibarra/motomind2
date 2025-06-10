import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  // Dummy state to hide dashboard/login/logout links
  const user = null; // Replace this with real auth logic later if needed

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login?action=login');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/login?action=register');
  };

  const handleLogout = async () => {
    // No real logout logic since Firebase is disabled
    console.log('Logout clicked');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="company-name-link">
          <h1 className="company-name">MotoMind</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/about">Nosotros</Link>
          <Link to="/contact">Contacto</Link>
          <Link to="/productos">Productos</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </nav>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-dropdown">
            <button className="user-email">Usuario</button>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login?action=register" className="register-link" onClick={handleRegisterClick}>
              Regístrate
            </Link>
            <button className="login-button" onClick={handleLoginClick}>
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
