import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  // If token exists, render the child component (the page)
  return children;
}

export default PrivateRoute;