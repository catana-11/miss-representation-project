import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from './LoadingPage';  
import ResultsPage from './ResultsPage';  

const TryItOutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [url, setUrl] = useState("");  // To hold YouTube URL
  const [text, setText] = useState("");  // To hold article text
  const [selectedOption, setSelectedOption] = useState(null);  // Text or YouTube
  const [context, setContext] = useState("");  // Optional context for analysis

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true);  // Show loading screen

    try {
      let requestBody = {};

      // Determine request data based on selected input type:
      if (selectedOption === 'youtube') {
        requestBody = { url };
      } else if (selectedOption === 'text') {
        requestBody = { text };
      }

      // Send the data to the Flask server for processing:
      const response = await fetch('http://127.0.0.1:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Fetch the results after processing:
      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error processing request:', error);
    } finally {
      setIsLoading(false);  // Hide loading screen after process is done:
    }
  };

  // Once the summary is available, show it in the results page:
  if (summary) {
    return <ResultsPage summary={summary} />;
  }

  return (
    <div className="page-content">
      <div className="try-it-out-container">
        <h1>Try It Out</h1>

        {/* Toggle Buttons for selecting input type */}
        <div className="toggle-buttons">
          <button className="toggle-button" onClick={() => setSelectedOption('text')}>
            Enter Article Text
          </button>
          <button className="toggle-button" onClick={() => setSelectedOption('youtube')}>
            Enter YouTube URL
          </button>
        </div>

        {/* YouTube URL form */}
        {selectedOption === 'youtube' && (
          <form onSubmit={handleSubmit}>
            <textarea
              className="text-box"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            
            {/* Optional Context Box */}
            <textarea
              className="text-box"
              placeholder="Optional context for analysis (if any)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        )}

        {/* Article Text form */}
        {selectedOption === 'text' && (
          <form onSubmit={handleSubmit}>
            <textarea
              className="text-box"
              placeholder="Enter Article Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            
            {/* Optional context for article text */}
            <textarea
              className="text-box"
              placeholder="Optional context for analysis (if any)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        )}

        {/* Show Loading Page if isLoading is true */}
        {isLoading && <LoadingPage />}
      </div>
    </div>
  );
}

export default TryItOutPage;
