import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';


import Home from './components/Home';
import TryItOut from './components/TryItOut';
import AboutUs from './components/AboutUs';
import Rules from './components/Rules';
import TwitterBot from './components/TwitterBot';
import ReviewProject from './components/ReviewProject';
import LoadingPage from './components/LoadingPage';
import ResultsPage from './components/ResultsPage';

import './App.css';  // Import App.css for global styles
import './components/Home.css'; // For Home component
import './components/AboutUs.css'; // For AboutUs component
import './components/Rules.css'; // For Rules component
import './components/LoadingScreen.css';
import './components/Results.css';
import './components/ReviewThisProject.css';
import './components/TryItOut.css';
import './components/TwitterBotLink.css';
import logo from "./logo.png";



function App() {
  return (
    <Router>
      <div className="App">
        {/* Top section with Logo and Navigation */}
        <div className="top-container">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="Miss Representation Logo" className="logo" />
            </Link>
          </div>

          {/* Navigation Bar */}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/try-it-out">Try It Out</Link>
            <Link to="/about">About Us</Link>
            <Link to="/rules">Rules</Link>
            <Link to="/twitter-bot">Twitter Bot</Link>
            <Link to="/review-project">Review This Project</Link>
          </nav>
        </div>

        {/* Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/try-it-out" element={<TryItOut />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/twitter-bot" element={<TwitterBot />} />
          <Route path="/review-project" element={<ReviewProject />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
