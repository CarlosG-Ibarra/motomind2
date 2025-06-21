import React, { useState } from 'react';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom';
import './Cascol1.css';

const CascoL2 = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedColor, setSelectedColor] = useState('Negro');
  const [customImage, setCustomImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const colorMapping = {
    'Negro': '#333333',
    'Blanco': '#ffffff',
    'Rojo': '#dc3545',
    'Azul': '#007bff',
    'Gris Metálico': '#808080'
  };

  const helmetData = {
    id: 2,
    name: 'MotoMind L2',
    price: 4000,
    baseSpecs: [
      'Material: Compuesto de fibra de carbono',
      'Certificaciones: DOT, ECE, SNELL',
      'Pantalla HUD integrada',
      'GPS y seguimiento de ruta',
      'Comunicación por intercom',
      'Conectividad: Bluetooth 5.2',
      'Peso: 1350g'
    ]
  };

  const availableColors = [
    'Negro',
    'Blanco',
    'Rojo',
    'Azul',
    'Gris Metálico'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCustomImage(file.name); 
    }
  };

  const handleAddToCart = () => {
    const customizations = {
      color: selectedColor,
      customImage: customImage || 'Sin imagen personalizada'
    };

    const cartItem = {
      ...helmetData,
      customizations: JSON.stringify(customizations),
      customizationDisplay: customizations,
      quantity: quantity
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem);
    }

    alert(`¡${quantity} ${helmetData.name} agregado(s) al carrito!`);
  };

  return (
    <div className="casco-container">
      <div className="casco-header">
        <button className="back-button" onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </button>
        <h1>MotoMind L2</h1>
      </div>
      
      <div className="casco-content">
        <div className="casco-preview">
          <div className="helmet-preview">
            <div className="helmet-3d-placeholder" style={{backgroundColor: colorMapping[selectedColor]}}>
              <p>Vista 3D del Casco</p>
              <p>Color: {selectedColor}</p>
              {customImage && <p>Imagen: {customImage}</p>}
            </div>
          </div>
        </div>

        <div className="casco-details">
          <div className="specs">
            <h2>Especificaciones técnicas</h2>
            <ul>
              {helmetData.baseSpecs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
              <li className="price-spec">Precio: ${helmetData.price.toLocaleString()} MXN</li>
            </ul>
          </div>

          <div className="customization-section">
            <h2>Personalización</h2>
            
            <div className="color-selection">
              <h3>Selecciona el color:</h3>
              <div className="color-options">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      backgroundColor: colorMapping[color]
                    }}
                    data-color={color}
                  >
                  </button>
                ))}
              </div>
            </div>

            <div className="image-upload">
              <h3>Imagen personalizada (opcional):</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              {customImage && (
                <p className="uploaded-file">Archivo seleccionado: {customImage}</p>
              )}
            </div>

            <div className="quantity-selection">
              <h3>Cantidad:</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="total-price">
              <h3>Total: ${(helmetData.price * quantity).toLocaleString()} MXN</h3>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CascoL2;