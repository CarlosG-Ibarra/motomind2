import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login'; // Import the Login component
import './App.css';
import Contact from './Components/Contact';
import About from './Components/About';
import Dashboard from './Components/Dashboard';

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

  return (
    <div>
      {!isLoginRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isLoginRoute && <Footer />}
    </div>
  );
};

export default App;
