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

const updateUserStatus = (id) => {
  return axios.put(`${API_URL}/users/${id}/status`, {}, getAuthHeaders());
};

const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/users/${id}`, userData, getAuthHeaders());
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
};

const adminService = {
  getAllUsers,
  getAllTransactions,
  updateUserStatus, // Export
  deleteUser,
  updateUser
};

export default adminService;