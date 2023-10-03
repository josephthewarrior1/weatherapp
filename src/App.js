import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const APIKEY = '6fd254392eb10d3298ac4ce720efc54a'; // Replace with your OpenWeatherMap API key

  const submitAction = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`
      );

      if (response.status === 200) {
        const weatherData = response.data;
        setWeatherData(weatherData);
      } else if (response.status === 404) {
        setWeatherData(null);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <table className="centerContainer">
        <tr>
          <td>
            <label id="cityLabel" htmlFor="cityNameTextField" style={{ color: 'black' }}>
              Enter a city:
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <input
              id="cityNameTextField"
              type="text"
              name="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <input id="submitButton" type="button" value="Submit" onClick={submitAction} />
          </td>
        </tr>
      </table>
      <div className="spacer"></div>
      <div id="weatherinfocomponent" style={{ display: loading ? 'block' : 'none' }}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
      {weatherData && (
        <div>
          {/* Display weather information here */}
          {/* You can use weatherData to access weather information */}
        </div>
      )}
    </div>
  );
}

export default App;
