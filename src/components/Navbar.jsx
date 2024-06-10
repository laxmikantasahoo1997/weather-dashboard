import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UseAppContext } from '../contextapi';
import useDebounce from '../hooks/useDebounce';
import logo from "../assets/weather-logo.png";

const Navbar = () => {
  const { setCityName,setWeatherDescription } = UseAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultLocationSet, setDefaultLocationSet] = useState(false);

  // Debounce the search term with a delay of 500ms
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // // Use Geolocation API to fetch user's location on first render
  useEffect(() => {
    if (!defaultLocationSet) {
      // Ask for user's location on first render
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchCityNameByCoordinates(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [defaultLocationSet]);

  // Update city name based on debounced search term
  useEffect(() => {
    // Update the city name after the debounce delay
    if (debouncedSearchTerm !== '') {
      setCityName(debouncedSearchTerm);
    } else {
      // Clear the city name state when the input box is empty

      setCityName(localStorage.getItem('city'));
    }
  }, [debouncedSearchTerm]);

    // Fetch city name based on user's coordinates
    const fetchCityNameByCoordinates = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.name) {
          setCityName(data.name);
          localStorage.setItem('city',data.name);
          setDefaultLocationSet(true);
        } else {
          console.error('City name not found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching city name:', error);
      }
    };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ display: 'flex', alignItems:"center",gap:"5px" }}>
          <img src={logo} height={"60px"} width={"60px"}/>Weather App
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search your city..."
          size="small"
          autoFocus
          style={{ backgroundColor: 'white' ,borderRadius:"5px"}} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

