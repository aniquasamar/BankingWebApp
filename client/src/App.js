import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Import your pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // <-- Import Dashboard
import TransferPage from './pages/TransferPage';
import HistoryPage from './pages/HistoryPage';

// Import your PrivateRoute component
import PrivateRoute from './components/PrivateRoute'; // <-- Import PrivateRoute

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
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
        <Route
          path="/transfer" // <-- ADD THIS ROUTE
          element={<PrivateRoute><TransferPage /></PrivateRoute>}
        />
        <Route
          path="/history"
          element={<PrivateRoute><HistoryPage /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;