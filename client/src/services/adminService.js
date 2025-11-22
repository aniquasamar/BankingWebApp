import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token,
    },
  };
};

const getAllUsers = () => {
  return axios.get(`${API_URL}/users`, getAuthHeaders());
};

const getAllTransactions = () => {
  return axios.get(`${API_URL}/transactions`, getAuthHeaders());
};

const adminService = {
  getAllUsers,
  getAllTransactions,
};

export default adminService;