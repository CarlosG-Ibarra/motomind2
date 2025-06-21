import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (cartId, newQuantity) => {
    updateQuantity(cartId, parseInt(newQuantity));
  };

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! (Esta es solo una demostración)');
    clearCart();
    navigate('/');
  };

  if (cartState.items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Carrito de Compras</h1>
        </div>
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/productos')}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Carrito de Compras</h1>
        <button 
          className="continue-shopping"
          onClick={() => navigate('/productos')}
        >
          Continuar Comprando
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartState.items.map((item) => (
            <div key={item.cartId} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toLocaleString()} MXN</p>
                
                {item.customizationDisplay && (
                  <div className="customizations">
                    <p><strong>Personalizaciones:</strong></p>
                    <p>Color: {item.customizationDisplay.color}</p>
                    <p>Imagen: {item.customizationDisplay.customImage}</p>
                  </div>
                )}
              </div>

              <div className="item-controls">
                <div className="quantity-control">
                  <label>Cantidad:</label>
                  <select 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.cartId, e.target.value)}
                    className="quantity-select"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="item-total">
                  <strong>${(item.price * item.quantity).toLocaleString()} MXN</strong>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.cartId)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Resumen de Compra</h2>
            <div className="summary-line">
              <span>Artículos ({cartState.totalItems}):</span>
              <span>${cartState.totalPrice.toLocaleString()} MXN</span>
            </div>
            <div className="summary-line">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <hr />
            <div className="summary-total">
              <strong>
                <span>Total:</span>
                <span>${cartState.totalPrice.toLocaleString()} MXN</span>
              </strong>
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceder al Pago
            </button>

            <button 
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;