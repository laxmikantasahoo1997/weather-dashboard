import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { GET } from '../config/api';
import { apiEndpoints } from '../config/Constants';
import Loader from './Loader';
import "./weather.css";


// Import your weather icons or images
import SunIcon from '../assets/sun-icon.png'; // example custom icon component
import RainIcon from '../assets/rain-icon.jpg';
import CloudIcon from '../assets/cloud-icon.jpg';
import { UseAppContext } from '../contextapi';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const { cityName ,setWeatherDescription} = UseAppContext();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await GET(`${apiEndpoints.weather}?q=${cityName}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`);
        setWeather(data);
        setWeatherDescription(data.weather[0].description.toLowerCase())
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, [cityName]);



  const description = weather?.weather[0]?.description?.toLowerCase();

  const getIconBasedOnWeather = ()=>{
  if(description.includes('cloud')){
      return CloudIcon;
    }else if(description.includes('rain')){
      return RainIcon;
    }else if(description.includes('haze')){
    return SunIcon;
  }else{
      return SunIcon
    }
  }

  if (!weather) {
    return <Loader  height={100}/>;
  }

  return (
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(3.8px)',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }}>
      <CardContent>
        <Typography variant="h5">
          {weather.name}
        </Typography>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px"}}>
        <Box >
        <Typography variant="h3">
          {Math.round(weather.main.temp - 273.15)}<sup style={{fontSize:"20px"}}>°C</sup> <img src={getIconBasedOnWeather()} alt={description} className='weather-img'  />
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
        </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;


