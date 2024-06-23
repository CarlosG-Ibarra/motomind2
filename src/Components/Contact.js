import React from "react";
import "./Contact.css"; // Import CSS for styling
import motocall from "./motocall.jpg";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="photo-section">
        <img src={motocall} alt="MotoMind Logo" />
        <p>Hello this is just a test </p>
      </div>
      <div className="info-section">
        <div className="contactos">
          <h3>Contactos</h3>
          {/* Add contact details here */}
        </div>
        <div className="ubicacion">
          <h3>Google Maps / Ubicación</h3>
          <iframe 
            className="google-maps"
            title="UTCH Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.570612653476!2d-106.14999538818748!3d28.642628583519166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea42c17167dc41%3A0x51865060df9440fb!2sUTCH!5e0!3m2!1sen!2smx!4v1718587065000!5m2!1sen!2smx" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
