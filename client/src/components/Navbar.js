import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../services/authService';

// Import MUI components
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Bank icon

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    // 'position="static"' keeps it at the top without overlapping content
    <AppBar position="static">
      <Toolbar>
        <AccountBalanceIcon sx={{ mr: 1 }} />
        <Typography 
          variant="h6" 
          component={RouterLink} // Make the logo a link to home
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          BankingWebApp
        </Typography>
        
        {/* We can add more nav links here later */}
        <Box>
          <Button 
            component={RouterLink} 
            to="/" 
            color="inherit"
          >
            Dashboard
          </Button>
          <Button 
            component={RouterLink} 
            to="/transfer" 
            color="inherit"
          >
            Transfer
          </Button>
          <Button 
            component={RouterLink} 
            to="/history" 
            color="inherit"
          >
            History
          </Button>
        </Box>

        <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;