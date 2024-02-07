import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(()=>{
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a1761b38f020e1d2f0132021b7a32d4&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          setWeatherData(null);
          throw new Error('Request failed');
        }
      } catch (error) {
        setWeatherData(null);
        console.error(error);
      }
    };
    fetchWeatherData();
  }, [city]
  )

  const getWeatherSymbol = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return '☀️'; // Sunny day
      case '02d':
        return '⛅'; // Partly cloudy day
      case '03d':
      case '04d':
        return '☁️'; // Cloudy day
      case '09d':
        return '🌧️'; // Rainy day
      case '10d':
        return '🌦️'; // Showers
      case '11d':
        return '⛈️'; // Thunderstorm
      case '13d':
        return '❄️'; // Snow
      default:
        return '🌍'; // Globe icon
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setCity(userInput)
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a city"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={()=>setCity(userInput)}>Get Weather</button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2>
            {weatherData.name} {getWeatherSymbol(weatherData.weather[0].icon)}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      {!weatherData && <h2>Please enter a city</h2>}
    </div>
  );
};

export default App;
