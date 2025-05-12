import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: 4,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        textAlign: 'center',
      }}
    >
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontFamily: 'OpsNetLogo',
          mb: 4,
        }}
      >
        Welcome to OpsNet
      </Typography>
      
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ mb: 4 }}
      >
        A modern, secure chat application
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{
            backgroundColor: theme.colors.primary,
            '&:hover': {
              backgroundColor: theme.colors.secondary,
            },
          }}
        >
          Login
        </Button>
        
        <Button
          variant="outlined"
          component={Link}
          to="/signup"
          sx={{
            borderColor: theme.colors.primary,
            color: theme.colors.text,
            '&:hover': {
              borderColor: theme.colors.secondary,
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Home;