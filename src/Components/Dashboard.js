import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Dashboard.css'; 

const Dashboard = () => {
  const [humidity, setHumidity] = useState(45);
  const [incl, setIncl] = useState(10);
  const [temperature, setTemperature] = useState(22);
  const [velocity, setVelocity] = useState(50);


  useEffect(() => {
    const interval = setInterval(() => {
      setHumidity((prev) => (prev + 1) % 100);
      setIncl((prev) => (prev + 1) % 360);
      setTemperature((prev) => prev + (Math.random() - 0.5));
      setVelocity((prev) => (prev + Math.random() * 5) % 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>Temperatura</h3>
          <div className="temperature-display">
            {temperature !== null ? `${temperature.toFixed(1)} °C` : 'Loading...'}
          </div>
        </div>

        <div className="chart">
          <h3>Velocidad</h3>
          <GaugeChart
            id="velocity-gauge"
            nrOfLevels={20}
            percent={velocity !== null ? velocity / 100 : 0}
            textColor="#000000"
          />
          <div className="velocity-display">
            {velocity !== null ? `${velocity.toFixed(1)} km/h` : 'Loading...'}
          </div>
        </div>

        <div className="chart">
          <h3>Humedad</h3>
          <div className="humidity-display">
            {humidity !== null ? `${humidity} %` : 'Loading...'}
          </div>
        </div>

        <div className="chart">
          <h3>Inclinación</h3>
          <div className="inclination-display">
            <div className="needle" style={{ transform: `rotate(${incl}deg)` }} />
            <div className="inclination-value">
              {incl !== null ? `${incl}°` : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
