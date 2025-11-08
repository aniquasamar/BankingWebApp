import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar

const styles = {
  container: {
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
};

function DashboardPage() {
  return (
    <div>
      <Navbar /> {/* Add the Navbar at the top */}
      <div style={styles.container}>
        <h1 style={styles.title}>Your Dashboard</h1>
        <p>Welcome to your bank account.</p>
        {/* We will add balance and other features here */}
      </div>
    </div>
  );
}

export default DashboardPage;