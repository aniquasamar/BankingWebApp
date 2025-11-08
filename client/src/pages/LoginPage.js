import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../services/authService';

// Import MUI components
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Alert 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // This logic is 100% the same as before!
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await authService.login(email, password);
      navigate('/'); 
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Login failed';
      setMessage(errorMsg);
    }
  };

  return (
    // <Container> centers your content and sets a max-width
    <Container component="main" maxWidth="xs">
      {/* <Box> is just a modern <div>. 'sx' is how you add custom styles */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {/* 'component="form"' is better for semantics */}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show an <Alert> for errors */}
          {message && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {message}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained" // This gives it the modern, filled-in look
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {/* This uses the MUI Link, but tells it to act like a React Router Link */}
          <Link component={RouterLink} to="/register" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;