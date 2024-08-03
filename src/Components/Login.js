import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importar hooks de React Router
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"; // Importar funciones de autenticación de Firebase
import "./Login.css"; // Importar archivo CSS
import { auth } from "./firebaseConfig"; // Importar configuración de Firebase
import { FaUser } from "react-icons/fa"; // Importar icono de usuario de React Icons
import { RiGoogleFill } from "react-icons/ri"; // Importar icono de Google de React Icons

const Login = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const location = useLocation(); // Hook para obtener la ubicación actual
  const [showLoginForm, setShowLoginForm] = useState(true); // Estado para mostrar formulario de inicio de sesión o registro
  const [email, setEmail] = useState(""); // Estado para el campo de correo electrónico
  const [password, setPassword] = useState(""); // Estado para el campo de contraseña
  const [error, setError] = useState(""); // Estado para manejar errores generales
  const [passwordError, setPasswordError] = useState(""); // Estado para manejar errores específicos de contraseña

  // Efecto para manejar la ubicación y cambiar entre inicio de sesión y registro
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get("action");

    // Mostrar formulario de registro si la acción es "register", de lo contrario mostrar formulario de inicio de sesión
    if (action === "register") {
      setShowLoginForm(false);
    } else {
      setShowLoginForm(true);
    }

    // Verificar el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirigir al usuario a la página principal si está autenticado
      }
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, [location.search, navigate]);

  // Función para cambiar entre formulario de inicio de sesión y registro
  const toggleForms = () => {
    setShowLoginForm(!showLoginForm); // Cambiar el estado para mostrar el formulario opuesto
    setError(""); // Limpiar mensaje de error
    setEmail(""); // Limpiar campo de correo electrónico
    setPassword(""); // Limpiar campo de contraseña
    setPasswordError(""); // Limpiar mensaje de error de contraseña
  };

  // Función para validar la complejidad de la contraseña
  const validatePassword = (password) => {
    if (password.length < 6) {
      // Validar longitud mínima de la contraseña
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    // Agregar más reglas de validación complejas aquí si es necesario
    return true;
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!validatePassword(password)) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password); // Iniciar sesión con Firebase Auth
      alert("¡Inicio de sesión exitoso!"); // Alerta de éxito
      navigate("/"); // Redirigir al usuario a la página principal
    } catch (error) {
      setError(
        "Falló el inicio de sesión. Por favor verifica tus credenciales."
      ); // Manejar errores de inicio de sesión
    }
  };

  // Función para manejar el registro
  const handleRegister = async () => {
    if (!validatePassword(password)) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password); // Registrar usuario con Firebase Auth
      alert("¡Registro exitoso!"); // Alerta de éxito
      navigate("/"); // Redirigir al usuario a la página principal
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres."); // Manejar error de contraseña débil
      } else {
        setError(
          "Falló el registro. Por favor inténtalo nuevamente."
        ); // Manejar otros errores de registro
      }
    }
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Crear proveedor de autenticación de Google
      await signInWithPopup(auth, provider); // Iniciar sesión con Google mediante Firebase Auth
      alert("¡Inicio de sesión con Google exitoso!"); // Alerta de éxito
      navigate("/"); // Redirigir al usuario a la página principal
    } catch (error) {
      setError(
        "Falló el inicio de sesión con Google. Por favor inténtalo nuevamente."
      ); // Manejar errores de inicio de sesión con Google
    }
  };

  return (
    <div className="login-body">
      <div className="container-login fade-in">
        {showLoginForm ? (
          <div id="loginForm" className="form-container fade-in">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si existe */}
            <div className="input-container">
              <input
                type="email"
                id="loginEmail"
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                id="loginPassword"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error">{passwordError}</p>} {/* Mostrar mensaje de error de contraseña si existe */}
            </div>
            <div className="button-container">
              <button className="iniciar-button" onClick={handleLogin}>
                <FaUser className="button-icon" /> Iniciar Sesión
              </button>
              <button
                className="iniciar-button google-button"
                onClick={handleGoogleLogin}
              >
                <RiGoogleFill className="button-icon" /> Iniciar con Google
              </button>
            </div>
            <p>
              ¿No tienes una cuenta?{" "}
              <button className="link-button" onClick={toggleForms}>
                Regístrate ahora
              </button>
            </p>
          </div>
        ) : (
          <div id="registerForm" className="form-container fade-in">
            <h2>Registro</h2>
            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si existe */}
            <div className="input-container">
              <input
                type="email"
                id="registerEmail"
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                id="registerPassword"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error">{passwordError}</p>} {/* Mostrar mensaje de error de contraseña si existe */}
            </div>
            <div className="button-container">
              <button className="iniciar-button" onClick={handleRegister}>
                <FaUser className="button-icon" /> Registro
              </button>
              <button
                className="iniciar-button google-button"
                onClick={handleGoogleLogin}
              >
                <RiGoogleFill className="button-icon" /> Registro con Google
              </button>
            </div>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button className="link-button" onClick={toggleForms}>
                Inicia Sesión
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
