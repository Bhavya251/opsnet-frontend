import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const result = await register({
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
    });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: theme.colors.background,
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 500,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.colors.text }}>
          Sign Up
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! Redirecting to login...
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: theme.colors.primary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme.colors.primary },
                '&:hover fieldset': { borderColor: theme.colors.secondary },
              },
              '& .MuiInputBase-input': { color: theme.colors.text },
            }}
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: theme.colors.primary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme.colors.primary },
                '&:hover fieldset': { borderColor: theme.colors.secondary },
              },
              '& .MuiInputBase-input': { color: theme.colors.text },
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiInputLabel-root': { color: theme.colors.primary },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.colors.primary },
                  '&:hover fieldset': { borderColor: theme.colors.secondary },
                },
                '& .MuiInputBase-input': { color: theme.colors.text },
              }}
            />
            
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiInputLabel-root': { color: theme.colors.primary },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.colors.primary },
                  '&:hover fieldset': { borderColor: theme.colors.secondary },
                },
                '& .MuiInputBase-input': { color: theme.colors.text },
              }}
            />
          </Box>
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: theme.colors.primary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme.colors.primary },
                '&:hover fieldset': { borderColor: theme.colors.secondary },
              },
              '& .MuiInputBase-input': { color: theme.colors.text },
            }}
          />
          
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: theme.colors.primary },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme.colors.primary },
                '&:hover fieldset': { borderColor: theme.colors.secondary },
              },
              '& .MuiInputBase-input': { color: theme.colors.text },
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.colors.primary,
              '&:hover': {
                backgroundColor: theme.colors.secondary,
              },
            }}
          >
            Sign Up
          </Button>
        </form>
        
        <Typography variant="body2" sx={{ color: theme.colors.text }}>
          Already have an account?{' '}
          <a 
            href="/login" 
            style={{ 
              color: theme.colors.secondary,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;