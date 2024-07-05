import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Dashboard.css'; // Import the CSS file

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [humidity, setHumidity] = useState([]);
  const [incl, setIncl] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [velocity, setVelocity] = useState([]);

  const chartRefs = useRef([]);

  useEffect(() => {
    const humidityRef = ref(database, 'Casco/humedad');
    const inclRef = ref(database, 'Casco/incl');
    const temperatureRef = ref(database, 'Casco/temperatura');
    const velocityRef = ref(database, 'Casco/vel');

    const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
      const data = snapshot.val();
      setHumidity((prev) => [...prev, data]);
    });

    const unsubscribeIncl = onValue(inclRef, (snapshot) => {
      const data = snapshot.val();
      setIncl((prev) => [...prev, data]);
    });

    const unsubscribeTemperature = onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature((prev) => [...prev, data]);
    });

    const unsubscribeVelocity = onValue(velocityRef, (snapshot) => {
      const data = snapshot.val();
      setVelocity((prev) => [...prev, data]);
    });

    const currentChartRefs = chartRefs.current;

    return () => {
      unsubscribeHumidity();
      unsubscribeIncl();
      unsubscribeTemperature();
      unsubscribeVelocity();

      currentChartRefs.forEach((chart) => {
        if (chart) {
          chart.destroy();
        }
      });
    };
  }, []);

  const humidityData = {
    labels: humidity.map((_, index) => index),
    datasets: [
      {
        label: 'Humedad',
        data: humidity,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  const inclData = {
    labels: incl.map((_, index) => index),
    datasets: [
      {
        label: 'Incl',
        data: incl,
        fill: false,
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  };

  const temperatureData = {
    labels: temperature.map((_, index) => index),
    datasets: [
      {
        label: 'Temperatura',
        data: temperature,
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
      },
    ],
  };

  const velocityData = {
    labels: velocity.map((_, index) => index),
    datasets: [
      {
        label: 'Velocidad',
        data: velocity,
        fill: false,
        backgroundColor: 'purple',
        borderColor: 'purple',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>Humedad</h3>
          <Line ref={(el) => (chartRefs.current[0] = el)} data={humidityData} />
        </div>
        <div className="chart">
          <h3>Incl</h3>
          <Line ref={(el) => (chartRefs.current[1] = el)} data={inclData} />
        </div>
        <div className="chart">
          <h3>Temperatura</h3>
          <Line ref={(el) => (chartRefs.current[2] = el)} data={temperatureData} />
        </div>
        <div className="chart">
          <h3>Velocidad</h3>
          <Line ref={(el) => (chartRefs.current[3] = el)} data={velocityData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
