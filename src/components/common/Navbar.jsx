import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const drawer = (
    <Box 
      sx={{ 
        width: 250,
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        height: '100%'
      }}
    >
      <List>
        {user ? (
          <>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/signup">
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  
  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontFamily: 'OpsNetLogo',
              fontSize: '1.5rem'
            }}
          >
            OpsNet
          </Typography>
          
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {user ? (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Welcome, {user.firstName}
                </Typography>
                <ThemeToggle />
              </>
            ) : (
              <>
                <ThemeToggle />
              </>
            )}
          </Box>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;