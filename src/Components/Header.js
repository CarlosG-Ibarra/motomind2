import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use Link from react-router-dom
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase Auth functions
import './Header.css'; // Import CSS

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null); // State for the current user

  useEffect(() => {
    const auth = getAuth(); // Get Firebase Auth instance

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Handle login button click
  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate('/login?action=login'); // Navigate to login page
  };

  // Handle register button click
  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate('/login?action=register'); // Navigate to register page
  };

  // Handle logout
  const handleLogout = async () => {
    const auth = getAuth(); // Get Firebase Auth instance

    try {
      await signOut(auth); // Sign out with Firebase
      setUser(null); // Clear user state
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error signing out:', error); // Handle errors
    }
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
          {user && <Link to="/dashboard">Dashboard</Link>} {/* Link to Dashboard visible only if user is authenticated */}
        </nav>
      </div>
      <div className="header-right">
        {user ? ( // Show user menu if user is logged in
          <div className="user-dropdown">
            <button className="user-email">{user.email}</button>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <> {/* Show login and register buttons if no user is logged in */}
            <Link to="/login?action=register" className="register-link" onClick={handleRegisterClick}>Regístrate</Link>
            <button className="login-button" onClick={handleLoginClick}>Iniciar sesión</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
