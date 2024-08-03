import React, { useState, useEffect, useCallback } from "react";
import "./Home.css"; // Importar archivo CSS
import motomindLogo from "./motomind_logo2.png"; // Importar imágenes y videos
import backgroundVideo from "./backgroundvideo.mp4";
import carouselImage1 from "./BackgroundIndex.png";
import carouselImage2 from "./login-background.jpg";
import carouselImage3 from "./moto2.jpg";
import carouselImage4 from "./motomind_logo.png";
import carouselImage5 from "./motomind_logo2.png";

const Home = () => {
  // Definir un arreglo de imágenes para el carrusel
  const images = [
    carouselImage1,
    carouselImage2,
    carouselImage3,
    carouselImage4,
    carouselImage5,
  ];

  // Estado para el índice de la imagen actual del carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para cambiar a la siguiente imagen del carrusel
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Función para cambiar a la imagen anterior del carrusel
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Efecto para cambiar la imagen del carrusel automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [nextImage]);

  return (
    <div className="home-content">
      <div className="home-background">
        <video autoPlay loop muted className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="logo fade-in">
          <img src={motomindLogo} alt="MotoMind Logo" />
        </div>
        <div className="slogan fade-in">
          <p>
            La conducción moderna es segura e inteligente. Manténte conectado,
            Manténte protegido.
          </p>
        </div>
      </div>

      <div className="features-section fade-in">
        <div className="feature-box">
          <i className="fas fa-thermometer-half"></i>
          <h3>Temperatura</h3>
          <p>
            Este sensor mide la temperatura ambiente y la muestra en grados
            Celsius, proporcionando información crucial para el monitoreo del
            entorno.
          </p>
        </div>
        <div className="feature-box">
          <i className="fas fa-tachometer-alt"></i>
          <h3>Velocidad</h3>
          <p>
            Utiliza un medidor de velocidad que muestra la velocidad actual en
            kilómetros por hora (km/h), permitiendo a los usuarios conocer su
            velocidad en tiempo real mientras conducen.
          </p>
        </div>
        <div className="feature-box">
          <i className="fas fa-tint"></i>
          <h3>Humedad</h3>
          <p>
            Este sensor mide el nivel de humedad en el ambiente y lo presenta en
            porcentaje (%), ayudando a los usuarios a estar conscientes de las
            condiciones de humedad alrededor de ellos.
          </p>
        </div>
        <div className="feature-box">
          <i className="fas fa-location-arrow"></i>
          <h3>Ubicación</h3>
          <p>
            Utiliza GPS para mostrar las coordenadas exactas (latitud y
            longitud) del usuario, proporcionando información precisa sobre su
            ubicación en tiempo real.
          </p>
        </div>
        <div className="feature-box">
          <i className="fas fa-compass"></i>
          <h3>Inclinación</h3>
          <p>
            Este sensor detecta la inclinación del casco y muestra el ángulo en
            grados, permitiendo a los usuarios tener conciencia de su posición
            relativa mientras conducen.
          </p>
        </div>
      </div>

      <div className="carousel fade-in">
        <button className="carousel-button left" onClick={prevImage}>
          ‹
        </button>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`carousel ${index}`}
            className={`carousel-image ${
              index === currentImageIndex ? "visible" : "hidden"
            }`}
          />
        ))}
        <button className="carousel-button right" onClick={nextImage}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Home;
