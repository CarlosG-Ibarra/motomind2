import React, { useEffect } from "react";
import "./About.css";
import Aboutus from "./Assets/Aboutus.jpg";
import Rodolfo from "./Assets/Rodolfo.jpg";
import Joel from "./Assets/Joel.jpg";
import Michelle from "./Assets/Michelle2.png";
import Carlos from "./Assets/Carlos.jpg";
import MissionImage from "./Assets/Mission.jpg";
import ValuesImage from "./Assets/Values.jpg";

// Lista de miembros del equipo con su información
const teamMembers = [
  {
    id: 1,
    name: "Rodolfo Yahir Fierro Solís",
    position: "CEO & Developer",
    image: Rodolfo,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero libero.",
  },
  {
    id: 2,
    name: "Carlos Gerardo Ibarra Alvídrez",
    position: "Developer",
    image: Carlos,
    bio: "Phasellus tincidunt nisi et magna posuere, vitae lacinia purus tincidunt.",
  },
  {
    id: 3,
    name: "Yarhem Michelle Morales Sáenz",
    position: "Developer",
    image: Michelle,
    bio: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
  {
    id: 4,
    name: "Joel Sebastián Gómez Aranda",
    position: "Developer",
    image: Joel,
    bio: "Sed eu magna ac velit dignissim eleifend. Nulla facilisi.",
  },
];

const About = () => {
  useEffect(() => {
    // useEffect se utiliza para aplicar el efecto de fade-in a los elementos con la clase "fade-in" cuando el componente se monta
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 200); // Efecto de fade-in escalonado
    });
  }, []);

  return (
    <section className="about-us">
      <div className="container">
        <div className="about-content fade-in">
          <div className="about-text">
            <h2>Sobre Nosotros</h2>
            <p>
              MotoMind es una microempresa ubicada en Chihuahua, México dedicada
              al desarrollo de cascos inteligentes para motociclistas. Nuestra
              empresa está compuesta por un grupo de estudiantes talentosos
              apasionados por la tecnología y la seguridad vial. A pesar de ser
              una microempresa, nuestro equipo destaca por su creatividad y
              compromiso con la innovación. Estamos enfocados en diseñar cascos
              que no solo protejan, sino que también proporcionen información
              crucial a conductor en tiempo real, mejorando así la seguridad y
              comodidad en cada viaje.
            </p>
            <a href="/" className="btn">
              Leer Mas
            </a>
          </div>
          <div className="about-image">
            <img src={Aboutus} alt="About Us" />
          </div>
        </div>
      </div>

      <div className="mission-section">
        <div className="container">
          <div className="mission-content fade-in">
            <div className="mission-image">
              <img src={MissionImage} alt="Our Mission" />
            </div>
            <div className="mission-text">
              <h2>Nuestra Mission</h2>
              <p>
                Ser la empresa líder en innovación tecnológica para la seguridad
                de motociclistas, revolucionando el mercado de cascos
                inteligentes y estableciendo nuevos estándares de seguridad y
                comodidad a nivel global.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <div className="values-content fade-in">
            <div className="values-text">
              <h2>Nuestra Vision</h2>
              <ul>
                Desarrollar cascos inteligentes de alta calidad que integren
                tecnología avanzada para mejorar la seguridad y la experiencia
                de conducción de los motociclistas. Nos comprometemos a innovar
                constantemente y a ofrecer soluciones que protejan y asistan a
                los conductores, contribuyendo así a reducir accidentes y salvar
                vidas.
              </ul>
            </div>
            <div className="values-image">
              <img src={ValuesImage} alt="Our Values" />
            </div>
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-members">
            {teamMembers.map((member) => (
              // Renderización de cada miembro del equipo
              <div className="team-member fade-in" key={member.id}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
