import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to create headers with the token
const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      'x-auth-token': token,
    },
  };
};

// Get user data
const getUserData = () => {
  return axios.get(`${API_URL}/me`, getAuthHeaders());
};

const userService = {
  getUserData,
};

export default userService;