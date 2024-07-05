import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./Login.css";
import { auth } from "./firebaseConfig"; // Import the Firebase configuration

// Import icons (adjust paths based on your setup)
import { FaUser } from "react-icons/fa";
import { RiGoogleFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const location = useLocation();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get("action");

    if (action === "register") {
      setShowLoginForm(false);
    } else {
      setShowLoginForm(true);
    }
  }, [location.search]);

  const toggleForms = () => {
    setShowLoginForm(!showLoginForm);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } catch (error) {
      setError("Falló el inicio de sesión. Por favor verifica tus credenciales.");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("¡Registro exitoso!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Falló el registro. Por favor inténtalo nuevamente.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("¡Inicio de sesión con Google exitoso!");
      navigate("/");
    } catch (error) {
      setError("Falló el inicio de sesión con Google. Por favor inténtalo nuevamente.");
    }
  };

  return (
    <div className="login-body">
      <div className="container-login fade-in">
        {showLoginForm ? (
          <div id="loginForm" className="form-container fade-in">
            <h2>Iniciar Sesión</h2>
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
