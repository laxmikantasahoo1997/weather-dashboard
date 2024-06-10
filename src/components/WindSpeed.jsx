import React from 'react';
import './weather.css';

const WindSpeed = ({ windSpeed }) => {
  const rotationAngle = (windSpeed / 30) * 180; // Assuming the maximum wind speed is 30 units

  return (
    <div className="gauge">
      <div className="needle" style={{ transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)` }}></div>
    </div>
  );
};

export default WindSpeed;
