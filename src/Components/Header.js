import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate('/login?action=login'); 
  };

  const handleRegisterClick = () => {
    navigate('/login?action=register'); 
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
      navigate('/'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
          <a href="/contact">Contacto</a>
          {user && <a href="/dashboard">Dashboard</a>} {/* Dashboard link visible only if user is logged in */}
        </nav>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-dropdown">
            <button className="user-email">{user.email}</button>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <>
            <a href="/login?action=register" className="register-link" onClick={handleRegisterClick}>Regístrate</a>
            <button className="login-button" onClick={handleLoginClick}>Iniciar sesión</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
