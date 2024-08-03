import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar hook de navegación
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Importar funciones de autenticación de Firebase
import './Header.css'; // Importar archivo CSS

const Header = () => {
  const navigate = useNavigate(); // Instanciar el hook de navegación
  const [user, setUser] = useState(null); // Estado para el usuario actual

  useEffect(() => {
    const auth = getAuth(); // Obtener instancia de autenticación de Firebase

    // Suscripción al cambio de estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualizar estado del usuario
    });

    return () => unsubscribe(); // Limpiar suscripción al desmontar el componente
  }, []);

  // Manejador para redirigir a la página de inicio de sesión
  const handleLoginClick = () => {
    navigate('/login?action=login'); // Navegar a la ruta de inicio de sesión
  };

  // Manejador para redirigir a la página de registro
  const handleRegisterClick = () => {
    navigate('/login?action=register'); // Navegar a la ruta de registro
  };

  // Manejador para cerrar sesión del usuario
  const handleLogout = async () => {
    const auth = getAuth(); // Obtener instancia de autenticación de Firebase

    try {
      await signOut(auth); // Cerrar sesión con Firebase
      setUser(null); // Limpiar estado del usuario
      navigate('/'); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error signing out:', error); // Manejo de errores en caso de fallo al cerrar sesión
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
          {user && <a href="/dashboard">Dashboard</a>} {/* Enlace a Dashboard visible solo si el usuario está autenticado */}
        </nav>
      </div>
      <div className="header-right">
        {user ? ( // Mostrar menú de usuario si hay sesión activa
          <div className="user-dropdown">
            <button className="user-email">{user.email}</button>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <> {/* Mostrar botón de inicio de sesión y enlace de registro si no hay sesión activa */}
            <a href="/login?action=register" className="register-link" onClick={handleRegisterClick}>Regístrate</a>
            <button className="login-button" onClick={handleLoginClick}>Iniciar sesión</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
