import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Container, Grid } from '@mui/material';
import WeatherCard from '../components/WeatherCard';
import WeatherAlerts from '../components/WeatherAlerts';
import Forecast from '../components/Forecast';
import Footer from '../components/Footer';
import { UseAppContext } from '../contextapi';

import sky from "../assets/sky.mp4";
import sunny from "../assets/sunny.mp4";
import cloudy from "../assets/cloudy.mp4";
import rain from "../assets/rain.mp4";
import BgVideo from '../components/BgVideo';

const Home = () => {
  const { weatherDescription } = UseAppContext();
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState(sky);

  useEffect(() => {
    const videoUrl = getBackgroundVideo(weatherDescription);
    setBackgroundVideoUrl(()=>videoUrl);
  }, [weatherDescription]);


  const getBackgroundVideo = (weatherDescription) => {
    const description = weatherDescription.toLowerCase();
    switch (true) {
      case description.includes("sunny"):
        return sunny;
      case description.includes("rain"):
        return rain;
      case description.includes("cloud"):
        return cloudy;
      case description.includes("clear"):
        return sky;
      default:
        return sky;
    }
  };
  


  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {backgroundVideoUrl && (
          <BgVideo backgroundVideoUrl={backgroundVideoUrl}/>
        )}
        <Container sx={{ mt: 3, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <WeatherCard />
            </Grid>
            <Grid item xs={12} md={9}>
              <WeatherAlerts />
            </Grid>
            <Grid item xs={12}>
              <Forecast />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

