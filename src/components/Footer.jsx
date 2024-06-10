import React from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0, width: '100%' }} >
      <Toolbar>
        <Typography variant="body1" align="center" style={{ width: '100%' }}>
          © 2024 | Crafted with ❤️ by Laxmikanta
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
