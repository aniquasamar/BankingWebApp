import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import userService from '../services/userService';
import { CircularProgress, Box } from '@mui/material';

function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await userService.getUserData();
        if (response.data.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If not admin, redirect to regular dashboard
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // If admin, show the page
  return children;
}

export default AdminRoute;