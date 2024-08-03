import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import "./Login.css";
import { auth } from "./firebaseConfig";
import { FaUser } from "react-icons/fa";
import { RiGoogleFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get("action");

    if (action === "register") {
      setShowLoginForm(false);
    } else {
      setShowLoginForm(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [location.search, navigate]);

  const toggleForms = () => {
    setShowLoginForm(!showLoginForm);
    setError("");
    setEmail("");
    setPassword("");
    setPasswordError("");
  };

  const validatePassword = (password) => {
    // Validate password complexity
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    // Add more complex validation rules here if needed
    return true;
  };

  const handleLogin = async () => {
    if (!validatePassword(password)) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } catch (error) {
      setError("Falló el inicio de sesión. Por favor verifica tus credenciales.");
    }
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      return;
    }

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
    try {
      const provider = new GoogleAuthProvider();
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
              {passwordError && <p className="error">{passwordError}</p>}
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
              {passwordError && <p className="error">{passwordError}</p>}
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
