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
import Wireframe from './Components/Wireframe';
import Productos from './Components/Productos';

const App = () => {
  return (
    <Router>
      <Content />
    </Router>
  );
};

const Content = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  useEffect(() => {
    // This effect previously handled Firebase logout, but has been cleaned up
    const handleBeforeUnload = (event) => {
      // Optional: Add confirmation prompt here if needed
      // event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      {!isLoginRoute && <Header />}
      <Routes>
        <Route path="/wireframe" element={<Wireframe />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
      {!isLoginRoute && <Footer />}
    </div>
  );
};

export default App;
