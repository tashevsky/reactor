import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography variant="body1">
        AC-130 Spectre
      </Typography>
      <Box sx={{ maxWidth: '100%', height: 'auto' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Lockheed_C-130_Hercules.jpg/1280px-Lockheed_C-130_Hercules.jpg" 
          alt="Description of image"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
    </Box>
  );
};

export default AboutPage;