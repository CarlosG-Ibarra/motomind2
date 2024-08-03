import React, { useEffect } from "react";
import "./About.css";
import Aboutus from "./Aboutus.jpg";
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
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis libero libero.
            </p>
            <a href="/" className="btn">
              Read More
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
              <h2>Our Mission</h2>
              <p>
                Our mission is to create innovative solutions that empower
                businesses to achieve their goals. We strive to deliver
                high-quality products and services that exceed our clients'
                expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <div className="values-content fade-in">
            <div className="values-text">
              <h2>Our Values</h2>
              <ul>
                <li>
                  Integrity: We uphold the highest standards of integrity in all
                  our actions.
                </li>
                <li>
                  Customer Commitment: We develop relationships that make a
                  positive difference in our customers' lives.
                </li>
                <li>
                  Quality: We provide outstanding products and unsurpassed service
                  that deliver premium value to our customers.
                </li>
                <li>
                  Teamwork: We work together, across boundaries, to meet the needs
                  of our customers and to help the company win.
                </li>
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
