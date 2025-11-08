import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// We can reuse the same styles
const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '40px auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  // We'll add a simple link style
  link: {
    textAlign: 'center',
    marginTop: '1rem',
    display: 'block',
    color: '#007bff',
    textDecoration: 'none',
  }
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Call the login service
      await authService.login(email, password);
      
      // If successful, navigate to the home/dashboard page
      navigate('/'); 

    } catch (error) {
      // Handle error
      const errorMsg = error.response?.data?.msg || 'Login failed';
      setMessage(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button typeS="submit" style={styles.button}>
          Login
        </button>
      </form>
      {message && <p style={{...styles.message, color: 'red'}}>{message}</p>}
      
      {/* Link to Register Page */}
      <a href="/register" style={styles.link}>
        Don't have an account? Register
      </a>
    </div>
  );
}

export default LoginPage;