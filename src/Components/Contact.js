import React from "react";
import "./Contact.css"; // Import CSS for styling
import moto2 from "./moto2.jpg";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="photo-section">
        <img src={moto2} alt="MotoMind Logo" />
      </div>
      <div className="info-section">
        <div className="contactos">
          <h3>Contactos</h3>
          {/* Add contact details here */}
        </div>
        <div className="ubicacion">
          <h3>Google Maps / Ubicación</h3>
          {/* Add Google Maps or location details here */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
