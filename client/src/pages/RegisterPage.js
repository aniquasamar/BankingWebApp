import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Basic styles for the form
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
};

function RegisterPage() {
  // State to hold the form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to hold any messages (like errors or success)
  const [message, setMessage] =useState('');

  const navigate = useNavigate();

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    setMessage(''); // Clear previous messages

    try {
      // Call our authService
      const response = await authService.register(name, email, password);
      
      // Handle success
      setMessage(response.data.msg); // Show success message from backend
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Handle error
      const errorMsg = error.response?.data?.msg || 'Registration failed';
      setMessage(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

export default RegisterPage;