import React, { useEffect, useState } from 'react'
import './WeatherComponent.css';
import searchIcon from '../assets/search.png';
import sunClearIcon from '../assets/clear.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import cloudImg from '../assets/cloud.png'
import drizzleImg from '../assets/drizzle.png';
import rainImg from '../assets/rain.png';
import snowImg from '../assets/snow.png'

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [searchInput, setSearchInput] = useState('');


  const VITE_WEATHER_ID = "e60448ebf0fc794257262b30b8395220";

  const allIcons = {
    "01d": sunClearIcon,
    "01n": sunClearIcon,
    "02d": cloudImg,
    "02n": cloudImg,
    "03d": cloudImg,
    "03n": cloudImg,
    "04d": drizzleImg,
    "04n": drizzleImg,
    "09d": rainImg,
    "09n": rainImg,
    "10d": rainImg,
    "10n": rainImg,
    "13d": snowImg,
    "13n": snowImg,
  }

  const searchWeather = async(city) => {
   try {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${VITE_WEATHER_ID}&units=metric`;

    
    const response = await fetch(url);
    const data = await response.json();
     console.log(data);
     const firstItem = data.list[0];
const icon = allIcons[firstItem.weather[0].icon] || sunClearIcon;
setWeatherData({
  humidity: firstItem.main.humidity,
  windSpeed: firstItem.wind.speed,
  temperature: Math.floor(firstItem.main.temp),
  location: data.city.name,
  icon: icon
});
  } catch (error) {
    console.log(error);
  }
  }

  useEffect(() => {
      searchWeather("");
  }, [])

  const handleSearch = () => {
  if (searchInput.trim() !== '') {
    searchWeather(searchInput);
  }
}


  return (
    <div className='weatherComponent'>
      <div className="inner">
        <div className="main-input">
        <input 
  type="text" 
  placeholder="Search"
  value={searchInput}
  onChange={(e) => setSearchInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }}
/>
       <div onClick={handleSearch} className="search-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#666565'/></svg>
          </div>
        </div>
        {weatherData && (
  <div className="weather-result-img">
    <img src={weatherData.icon} alt="Weather Icon" />
    <div className="weather-result-texts">
      <p className='temperature'>{weatherData.temperature}C</p>
      <p className='location'>{weatherData.location}</p>
    </div>
  </div>
)}

        <div className="weather-data">
          <div className="first-column">
            <img src={humidityIcon} alt="" />
            <div className="texts">
              <p>{weatherData.humidity}</p>
            <span>Humidity</span>
            </div>
          </div>
          <div className="second-column">
            <img src={windIcon} alt="" />
            <div className="texts">
              <p>{weatherData.windSpeed} km/h</p>
            <span>Wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherComponent
