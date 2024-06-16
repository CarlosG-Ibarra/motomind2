import React from "react";
import "./Home.css";
import motomindLogo from "./motomind_logo2.png";
import backgroundVideo from "./backgroundvideo.mp4";

const Home = () => {
  return (
    <div className="home-content">
      <div className="home-background">
        <video autoPlay loop muted className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="logo">
          <img src={motomindLogo} alt="MotoMind Logo" />
        </div>
        <div className="slogan">
          <p>
            La conducción moderna es segura e inteligente. Manténte
            conectado, Manténte protegido
          </p>
        </div>
      </div>
      <div className="box-section">
        <div className="box-1">
          <p>This is box 1</p>
        </div>
        <div className="box-2">
          <p>This is box 2</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
