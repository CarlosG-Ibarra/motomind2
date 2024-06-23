import React, { useState, useEffect } from "react";
import "./Login.css";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [showLoginForm, setShowLoginForm] = useState(true);

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
  };

  return (
    <div className="login-body">
      <div className="container-login">
        <div
          id="loginForm"
          className={`form-container ${showLoginForm ? "" : "hidden"}`}
        >
          <h2>Iniciar Sesión</h2>
          <input type="email" id="loginEmail" placeholder="Correo" required />
          <input
            type="password"
            id="loginPassword"
            placeholder="Contraseña"
            required
          />
          <button className="iniciar-button">Iniciar Sesión</button>
          <p>
            ¿No tienes una cuenta?{" "}
            <button className="link-button" onClick={toggleForms}>
              Regístrate ahora
            </button>
          </p>
        </div>
        <div
          id="registerForm"
          className={`form-container ${showLoginForm ? "hidden" : ""}`}
        >
          <h2>Registro</h2>
          <input
            type="email"
            id="registerEmail"
            placeholder="Correo"
            required
          />
          <input
            type="password"
            id="registerPassword"
            placeholder="Contraseña"
            required
          />
          <button className="iniciar-button">Registro</button>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <button className="link-button" onClick={toggleForms}>
              Inicia Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
