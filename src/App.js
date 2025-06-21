import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login';
import './App.css';
import Contact from './Components/Contact';
import About from './Components/About';
import Dashboard from './Components/Dashboard';
import Productos from './Components/Productos';
import CascoL1 from './Components/Cascol1';
import CascoL2 from './Components/Cascol2';
import CascoPro from './Components/Cascopro';
import { CartProvider } from './Components/CartContext';
import Cart from './Components/Cart';


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Content />
      </Router>
    </CartProvider>
  );
};

const Content = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  useEffect(() => {
    const handleBeforeUnload = (event) => {
   
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="app-container">
      {!isLoginRoute && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/cascol1" element={<CascoL1 />} />
          <Route path="/cascol2" element={<CascoL2 />} />
          <Route path="/cascopro" element={<CascoPro/>} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      {!isLoginRoute && <Footer />}
    </div>
  );
};

export default App;