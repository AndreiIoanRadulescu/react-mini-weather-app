import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a1761b38f020e1d2f0132021b7a32d4&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if the input is within a form element
      fetchWeatherData();
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
