import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, } from '@mui/material';
import { UseAppContext } from '../contextapi';
import { GET } from '../config/api';
import { apiEndpoints } from '../config/Constants';
import "./weather.css";


const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState(null);
  const { cityName } = UseAppContext();

  useEffect(() => {
    (async () => {
      try {
        const data = await GET(`${apiEndpoints.weatherAlert}?q=${cityName}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`);
        setAlerts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cityName]);


  return (
    <Card  sx={{
      background: 'rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(3.8px)',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }}>
      <CardContent>
        <Typography variant="h5">
          Weather Alerts
        </Typography>
        {alerts?.length > 0 ? (
          alerts?.map((alert, index) => (
            <Typography variant="body1" key={index}>
              {alert?.description}
            </Typography>
          ))
        ) : (
          <Typography variant="body1">
            No alerts at the moment.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherAlerts;
