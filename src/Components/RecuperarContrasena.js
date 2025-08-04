import React, { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import './RecuperarContrasena.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje('Se ha enviado un correo para restablecer tu contraseña.');
      setError('');
    } catch (err) {
      setError('No se pudo enviar el correo. Verifica el email e intenta de nuevo.');
      setMensaje('');
    }
  };

  return (
    <div className="recover-body">
      <div className="container-recover fade-in">
        <div className="recover-form">
          <h2>Recuperar Contraseña</h2>
          <p className="recover-description">
            Ingresa tu correo electrónico para recibir un enlace de recuperación.
          </p>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          {mensaje && <p className="success-message">{mensaje}</p>}
          <button className="recover-button" onClick={handleSubmit}>
            Enviar enlace
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
