import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import userService from '../services/userService';

// Import MUI components
import { 
  Container, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  CircularProgress, 
  Alert 
} from '@mui/material';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This logic is 100% the same
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getUserData();
        setUser(response.data);
      } catch (err) {
        setError('Could not fetch user data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Show a loading spinner while fetching
  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography>Loading Dashboard...</Typography>
        </Container>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {user && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Hello, {user.name}!
            </Typography>
            
            <Card sx={{ maxWidth: 400, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">
                  Your Current Balance:
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  ${user.balance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>

            <Button 
              component={RouterLink} 
              to="/transfer" 
              variant="contained" 
              size="large"
            >
              Make a Transfer
            </Button>
          </>
        )}
      </Container>
    </div>
  );
}

export default DashboardPage;