import React from 'react';
import './WeatherData.css';

const WeatherDataComponent =({name, main, weather}) => {
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
    return (
        <div className="weather-info">
            <h2>{name} {getWeatherSymbol(weather[0].icon)}</h2>
            <p>Temperature: {main.temp}°C</p>
            <p>Description: {weather[0].description}</p>
        </div>
    )
}

export default WeatherDataComponent;