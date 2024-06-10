import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Skeleton } from '@mui/material';
import { GET } from '../config/api';
import { apiEndpoints } from '../config/Constants';
import Loader from './Loader';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { UseAppContext } from '../contextapi';
import "./weather.css";

const Forecast = () => {
  const [forecast, setForecast] = useState(null);
  const { cityName } = UseAppContext();

  useEffect(() => {
    (async () => {
      try {
        const data = await GET(`${apiEndpoints.weatherForecast}?q=${cityName}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`);
        setForecast(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cityName]);

  // if (!forecast) {
  //   return <Loader numberOfLoader={6} />;
  // }

  const chartData = forecast?.list?.map(weather => ({
    date: new Date(weather.dt_txt)?.toLocaleDateString(),
    temperature: Math.round(weather?.main.temp - 273.15), // Convert Kelvin to Celsius
  }));

  return (
    <>
    {forecast?.list?.length > 0 ? 
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
          5-Day Forecast
        </Typography>
        <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    :
    <Loader height={500}/>
  }
    </>
  );
};

export default Forecast;

