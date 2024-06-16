import React from 'react'; 
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import './App.css';


const App = () => {
  return (
    <div>
      <Header></Header>
      <Home/>
      <Footer/>
    </div>
  );
};

export default App;
