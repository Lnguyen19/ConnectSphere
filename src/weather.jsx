import React, { useEffect, useState } from 'react';
import FindLocations from './findLocations';
import './weather_style.css'
import axios from 'axios';

const WeatherUpdate = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });

          const fetchData = async () => {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=522fa8911bbb36bdeaa91253af33b345&units=metric`
              );
              setWeatherData(response.data);
            } catch (error) {
              console.log(error);
            }
          };

          fetchData();
        },
        (error) => {
          console.log(error.message);
        },
        //{ timeout: 30000 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [userLocation]);

  return (
    <div>
      {weatherData && weatherData.current && (
        <div>
          <h2 className="title">Current location</h2>
          <p className="displays">
            The current temperature is: {weatherData.current.temp}°C
            <br />
            The current humidity is: {weatherData.current.humidity}%
            <br />
            The current wind speed is: {weatherData.current.wind_speed} mph
            
          </p>
        </div>
      )}

      {weatherData && weatherData.daily && (
        <div className ='weekly'>
          <h2 className="title">7-day Forecast</h2>
          <div>
            {weatherData.daily.map((day, index) => (
              <div key={index} className = 'day-box'>
                <p >Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {day.temp.day}°C</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Wind Speed: {day.wind_speed} mph</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <h3 className = 'searchingName'> Search for  a City</h3>
      <FindLocations />
    </div>

  );
};

export default WeatherUpdate;

