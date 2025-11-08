import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  console.log('PRIVATE ROUTE TOKEN:', token);

  if (!token) {
    // If no token, redirect to login
    console.log('NO TOKEN, redirecting to /login');
    return <Navigate to="/login" />;
  }

  // If token exists, render the child component (the page)
  console.log('TOKEN FOUND, rendering children');
  return children;
}

export default PrivateRoute;