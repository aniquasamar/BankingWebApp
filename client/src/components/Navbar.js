import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  button: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CoreBank</div>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;