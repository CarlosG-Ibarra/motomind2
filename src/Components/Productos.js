import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Productos.css';

const Productos = () => {
  const navigate = useNavigate();
  
  const helmets = [
    {
      id: 1,
      name: 'MotoMind L1',
      price: 3000,
      path: 'cascol1', 
      description: 'Casco inteligente con protección avanzada y conectividad básica',
      features: [
        'Sensores de temperatura y humedad',
        'Conectividad Bluetooth',
        'Material ABS de alta resistencia',
        'Certificación DOT y ECE'
      ]
    },
    {
      id: 2,
      name: 'MotoMind L2',
      price: 4000,
      path: 'cascol2', 
      description: 'Casco premium con características mejoradas de seguridad y conectividad',
      features: [
        'Pantalla HUD integrada',
        'GPS y seguimiento de ruta',
        'Comunicación por intercom',
        'Material compuesto de fibra de carbono',
        'Certificación DOT, ECE y SNELL'
      ]
    },
    {
      id: 3,
      name: 'MotoMind Pro',
      price: 5000,
      path: 'cascopro',
      description: 'El casco más avanzado con tecnología de punta',
      features: [
        'Visión nocturna integrada',
        'Alertas de colisión',
        'Asistente de voz',
        'Conexión 4G/LTE',
        'Material termoplástico avanzado',
        'Certificación DOT, ECE y FIM'
      ]
    }
  ];

  const handleCustomize = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h1>Nuestra Línea de Cascos Inteligentes</h1>
        <p>Diseñados para la seguridad y conectividad del motociclista moderno</p>
      </div>
      
      <div className="helmet-grid">
        {helmets.map((helmet) => (
          <div key={helmet.id} className="helmet-card">
            <div className="helmet-info">
              <h3>{helmet.name}</h3>
              <p className="helmet-description">{helmet.description}</p>
              
              <div className="features-list">
                <h4>Características:</h4>
                <ul>
                  {helmet.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="helmet-price">
                <span className="price">${helmet.price.toLocaleString()} MXN</span>
              </div>
              
              <div className="helmet-actions">
                <button 
                  className="customize-button"
                  onClick={() => handleCustomize(helmet.path)}
                >
                  Ver y Personalizar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;