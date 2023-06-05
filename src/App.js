import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city !== '') {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    try {
      const apiKey = '7a68b417b0755c46e6c25c1e0a94404e';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
      setError('Error fetching weather data');
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeather();
    }
  };

  return (
    <div>
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Ingrese una ciudad"
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Clima: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
