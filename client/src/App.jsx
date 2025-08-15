// /client/src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// For local dev, set VITE_API_BASE_URL in .env
// Leave blank for production so relative paths work
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, { longUrl });

      // Always use full absolute URL
      const createdShortUrl = `${window.location.origin}/${response.data.shortCode}`;
      setShortUrl(createdShortUrl);
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError(err.response?.data?.error || 'Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL to shorten..."
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {shortUrl && (
        <div className="result">
          <p>Your shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
