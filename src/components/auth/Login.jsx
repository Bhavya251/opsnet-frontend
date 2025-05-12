import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import SecretPhraseDialog from './SecretPhraseDialog';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { login, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOpenDialog(true);
    }
  }, [user]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(credentials);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/dashboard');
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
          maxWidth: 400,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.colors.text }}>
          Login
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={credentials.username}
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
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
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
            Login
          </Button>
        </form>
        
        <Typography variant="body2" sx={{ color: theme.colors.text }}>
          Don't have an account?{' '}
          <a 
            href="/signup" 
            style={{ 
              color: theme.colors.secondary,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign up
          </a>
        </Typography>
      </Paper>
      
      <SecretPhraseDialog open={openDialog} onClose={handleDialogClose} />
    </Box>
  );
};

export default Login;