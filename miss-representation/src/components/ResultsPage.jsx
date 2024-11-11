import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css';

const ResultsPage = ({ summary }) => {
    const navigate = useNavigate();

    const handlePostToTwitter = () => {
        // Pass the summary data to TwitterBotPage for posting
        navigate('/twitter-bot', { state: { summary } });
    };

    return (
      <div className="page-content">
        <h1>Results</h1>
        <div className="results-container">
          <div
            className="results-content"
            dangerouslySetInnerHTML={{ __html: summary }} 
          />
        </div>
        <button className="post-twitter-button" onClick={handlePostToTwitter}>
            Post about this on Twitter
        </button>
      </div>
    );
};

export default ResultsPage;
