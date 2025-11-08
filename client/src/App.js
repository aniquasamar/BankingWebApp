import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // <-- Import Dashboard

// Import your PrivateRoute component
import PrivateRoute from './components/PrivateRoute'; // <-- Import PrivateRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* This is the new Protected Route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;