import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png'; 
import './Home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="page-content">
      <div className="home-container">
        <h1 className="header">Welcome to</h1>
        <img src={logo} alt="Miss Representation Logo" className="home-logo" />
        <p className="home-description">Exploring and critiquing societal issues with wit and insight!</p>
        <button className="try-it-out-button" onClick={() => navigate('/try-it-out')}>Try It Out!</button>
      </div>
    </div>
  );
}

export default Home;
