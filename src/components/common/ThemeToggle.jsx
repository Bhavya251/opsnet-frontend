import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  
  return (
    <IconButton 
      onClick={toggleTheme}
      sx={{
        margin: '0 10px',
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;