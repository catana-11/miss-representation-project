import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TwitterBotPage = () => {


  return (
    <div className="page-content">
      <div className="twitter-bot-container">
        <h1>Twitter Bot</h1>
        <p>Not working currently!</p>
        <button 
          className='submit-button' 
        >
          Confirm Post
        </button>
      </div>
    </div>
  );
};

export default TwitterBotPage;
