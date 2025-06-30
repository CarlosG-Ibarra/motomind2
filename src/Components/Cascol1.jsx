import React, { useState, Suspense } from 'react'
import { useCart } from './CartContext'
import { useNavigate } from 'react-router-dom'
import HelmetModel from './Helmet.jsx' 
import './Cascol1.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const CascoL1 = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [selectedColor, setSelectedColor] = useState('Negro')
  const [customImage, setCustomImage] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const colorMapping = {
    Negro: '#333333',
    Blanco: '#ffffff',
    Rojo: '#dc3545',
    Azul: '#007bff',
    'Gris Metálico': '#808080',
  }

  const helmetData = {
    id: 1,
    name: 'MotoMind L1',
    price: 3000,
    baseSpecs: [
      'Material: ABS de alta resistencia',
      'Certificaciones: DOT, ECE',
      'Sensores: Temperatura, humedad',
      'Conectividad: Bluetooth 5.0',
      'Peso: 1450g',
    ],
  }

  const availableColors = Object.keys(colorMapping)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCustomImage(file)
    }
  }

  const handleAddToCart = () => {
    const customizations = {
      color: selectedColor,
      customImage: customImage?.name || 'Sin imagen personalizada',
    }

    const cartItem = {
      ...helmetData,
      customizations: JSON.stringify(customizations),
      customizationDisplay: customizations,
      quantity,
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem)
    }

    alert(`¡${quantity} ${helmetData.name} agregado(s) al carrito!`)
  }

  return (
    <div className="casco-container">
      <div className="casco-header">
        <button className="back-button" onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </button>
        <h1>MotoMind L1</h1>
      </div>

      <div className="casco-content">
        <div className="casco-preview">
          <div className="helmet-preview">
            <div
              className="helmet-3d-placeholder"
              style={{ backgroundColor: colorMapping[selectedColor] }}
            >
              <Canvas camera={{ position: [0, 0, 3.5] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 2]} intensity={1.5} />
                <Suspense fallback={null}>
                  <HelmetModel
                    color={colorMapping[selectedColor]}
                    textureURL={customImage ? URL.createObjectURL(customImage) : null}
                  />
                </Suspense>
                <OrbitControls />
              </Canvas>
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
              <li className="price-spec">
                Precio: ${helmetData.price.toLocaleString()} MXN
              </li>
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
                    style={{ backgroundColor: colorMapping[color] }}
                    data-color={color}
                  />
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
                <p className="uploaded-file">Archivo seleccionado: {customImage.name}</p>
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

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CascoL1
