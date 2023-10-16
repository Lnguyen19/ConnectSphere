import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './findLocations.css'

const FindLocations = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
const [suggestions, setSuggestions] = useState([]);










  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const e = 'en';
      const m = 'metric';
      const key = '522fa8911bbb36bdeaa91253af33b345'; // Replace with your OpenWeatherMap API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${key}&units=${m}&lang=${e}`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input className = 'entering'
          type="text"
          id="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {weatherData && weatherData.main && (
        <div>
          <h2 className="title">{weatherData.name}</h2>
          <p className="displays">
            The current temperature is: {weatherData.main.temp}°C
            <br />
            The current humidity is: {weatherData.main.humidity}%
            <br />
            The current wind speed is: {weatherData.wind.speed} mph
          </p>
        </div>
      )}
        {weatherData && weatherData.daily && (
        <div>
          <h2 className="title">7-day Forecast</h2>
          <div>
            {weatherData.daily.map((day, index) => (
              <div key={index} className = 'day-box'>
                <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {day.temp.day}°C</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Wind Speed: {day.wind_speed} mph</p>
              </div>
            ))}
          </div>
        </div>
      )}








    </div>
  );
};

export default FindLocations;