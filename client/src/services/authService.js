import axios from 'axios';

// The URL of our backend server
const API_URL = 'http://localhost:5000/api/auth';

// Register user function
const register = (name, email, password) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
};

// Login user function
const login = async (email, password) => {
  // 1. Make the API call and wait for the response
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  // 2. Check for the token and save it
  if (response.data.token) {
    // Add a console.log to be 100% sure
    console.log('Token received:', response.data.token);
    localStorage.setItem('token', response.data.token);
  }

  // 3. Return the data
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;