import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { RiGoogleFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Skip login and go directly to the app
  const handleSkipLogin = () => {
    navigate("/");
  };

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
      setPasswordError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  // Handle login (mock version)
  const handleLogin = async () => {
    if (!validatePassword(password)) return;

    // Mock authentication - just check if fields are filled
    if (email && password) {
      alert("Login successful (mock)!");
      navigate("/");
    } else {
      setError("Please enter both email and password.");
    }
  };

  // Handle registration (mock version)
  const handleRegister = async () => {
    if (!validatePassword(password)) return;

    // Mock registration - just check if fields are filled
    if (email && password) {
      alert("Registration successful (mock)!");
      navigate("/");
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div className="login-body">
      <div className="container-login fade-in">
        {showLoginForm ? (
          <div id="loginForm" className="form-container fade-in">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-container">
              <input
                type="email"
                id="loginEmail"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="button-container">
              <button className="iniciar-button" onClick={handleLogin}>
                <FaUser className="button-icon" /> Login
              </button>
              <button className="iniciar-button google-button" disabled>
                <RiGoogleFill className="button-icon" /> Login with Google (disabled)
              </button>
              <button 
                className="iniciar-button skip-button" 
                onClick={handleSkipLogin}
              >
                Skip Login
              </button>
            </div>
            <p>
              Don't have an account?{" "}
              <button className="link-button" onClick={toggleForms}>
                Register now
              </button>
            </p>
          </div>
        ) : (
          <div id="registerForm" className="form-container fade-in">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-container">
              <input
                type="email"
                id="registerEmail"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                id="registerPassword"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="button-container">
              <button className="iniciar-button" onClick={handleRegister}>
                <FaUser className="button-icon" /> Register
              </button>
              <button className="iniciar-button skip-button" onClick={handleSkipLogin}>
                Skip Login
              </button>
            </div>
            <p>
              Already have an account?{" "}
              <button className="link-button" onClick={toggleForms}>
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;