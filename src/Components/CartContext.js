import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.customizations === action.payload.customizations
      );
      
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      }
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.cartId !== action.payload.cartId);
      const removedItem = state.items.find(item => item.cartId === action.payload.cartId);
      return {
        ...state,
        items: filteredItems,
        totalItems: state.totalItems - removedItem.quantity,
        totalPrice: state.totalPrice - (removedItem.price * removedItem.quantity)
      };
    
    case 'UPDATE_QUANTITY':
      const item = state.items.find(item => item.cartId === action.payload.cartId);
      const quantityDiff = action.payload.quantity - item.quantity;
      
      const updatedItems = state.items.map(item => {
        if (item.cartId === action.payload.cartId) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.price * quantityDiff)
      };
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    
    default:
      return state;
  }
};

const initialCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (item) => {
    const cartId = `${item.id}-${Date.now()}-${Math.random()}`;
    dispatch({
      type: 'ADD_TO_CART', 
      payload: { ...item, cartId }
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartId } });
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartItemCount = () => {
    return cartState.totalItems;
  };

  return (
    <CartContext.Provider value={{
      cartState,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};