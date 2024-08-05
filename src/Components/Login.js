import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks from React Router
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"; // Import Firebase Auth functions
import { auth } from "./firebaseConfig"; // Import Firebase auth instance
import "./Login.css"; // Import CSS
import { FaUser } from "react-icons/fa"; // Import user icon
import { RiGoogleFill } from "react-icons/ri"; // Import Google icon

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for current location
  const [showLoginForm, setShowLoginForm] = useState(true); // State to toggle between login and register forms
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state
  const [passwordError, setPasswordError] = useState(""); // Password error state

  // Handle form display based on URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get("action");
    setShowLoginForm(action !== "register");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to home if authenticated
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, [location.search, navigate]);

  // Toggle between login and register forms
  const toggleForms = () => {
    setShowLoginForm(!showLoginForm);
    setError("");
    setEmail("");
    setPassword("");
    setPasswordError("");
  };

  // Validate password complexity
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    return true;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validatePassword(password)) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Inicio de sesión exitoso!");
      navigate("/"); // Redirect to home
    } catch (error) {
      setError("Error en el inicio de sesión. Por favor, verifica tus credenciales.");
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validatePassword(password)) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("¡Registro exitoso!");
      navigate("/"); // Redirect to home
    } catch (error) {
      setError(error.code === "auth/weak-password" ? 
        "La contraseña debe tener al menos 6 caracteres." : 
        "Error en el registro. Por favor, inténtalo de nuevo.");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("¡Inicio de sesión con Google exitoso!");
      navigate("/"); // Redirect to home
    } catch (error) {
      setError("Error en el inicio de sesión con Google. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-body">
      <div className="container-login fade-in">
        {showLoginForm ? (
          <div id="loginForm" className="form-container fade-in">
            <h2>Iniciar sesión</h2>
            {error && <p className="error">{error}</p>}
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
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="button-container">
              <button className="iniciar-button" onClick={handleLogin}>
                <FaUser className="button-icon" /> Iniciar sesión
              </button>
              <button className="iniciar-button google-button" onClick={handleGoogleLogin}>
                <RiGoogleFill className="button-icon" /> Iniciar sesión con Google
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
            {error && <p className="error">{error}</p>}
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
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="button-container">
              <button className="iniciar-button" onClick={handleRegister}>
                <FaUser className="button-icon" /> Registrarse
              </button>
              <button className="iniciar-button google-button" onClick={handleGoogleLogin}>
                <RiGoogleFill className="button-icon" /> Registrarse con Google
              </button>
            </div>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button className="link-button" onClick={toggleForms}>
                Iniciar sesión
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
