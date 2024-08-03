import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig';
import GaugeChart from 'react-gauge-chart';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [humidity, setHumidity] = useState(null);
  const [incl, setIncl] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [velocity, setVelocity] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const humidityRef = ref(database, 'Casco/humedad');
    const inclRef = ref(database, 'Casco/incl');
    const temperatureRef = ref(database, 'Casco/temperatura');
    const velocityRef = ref(database, 'Casco/vel');
    const latRef = ref(database, 'Casco/lat');
    const lngRef = ref(database, 'Casco/lng');

    const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
      setHumidity(snapshot.val());
    });

    const unsubscribeIncl = onValue(inclRef, (snapshot) => {
      setIncl(snapshot.val());
    });

    const unsubscribeTemperature = onValue(temperatureRef, (snapshot) => {
      setTemperature(snapshot.val());
    });

    const unsubscribeVelocity = onValue(velocityRef, (snapshot) => {
      setVelocity(snapshot.val());
    });

    const unsubscribeLat = onValue(latRef, (snapshot) => {
      setLatitude(snapshot.val());
    });

    const unsubscribeLng = onValue(lngRef, (snapshot) => {
      setLongitude(snapshot.val());
    });

    return () => {
      unsubscribeHumidity();
      unsubscribeIncl();
      unsubscribeTemperature();
      unsubscribeVelocity();
      unsubscribeLat();
      unsubscribeLng();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>Temperatura</h3>
          <div className="temperature-display">
            {temperature !== null ? `${temperature} °C` : 'Loading...'}
          </div>
        </div>
        <div className="chart">
          <h3>Ubicación</h3>
          <div className="location-display">
            <div className="latitude">
              {latitude !== null ? `Latitud: ${latitude}` : 'Loading...'}
            </div>
            <div className="longitude">
              {longitude !== null ? `Longitud: ${longitude}` : 'Loading...'}
            </div>
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
            {velocity !== null ? `${velocity} km/h` : 'Loading...'}
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
