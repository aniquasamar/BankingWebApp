import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

// Function to create headers with the token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token,
    },
  };
};

// Transfer funds
const transferFunds = (recipientEmail, amount) => {
  return axios.post(
    `${API_URL}/transfer`,
    { recipientEmail, amount },
    getAuthHeaders()
  );
};

// Get transaction history
const getHistory = () => {
  return axios.get(`${API_URL}/history`, getAuthHeaders());
};

const transactionService = {
  transferFunds,
  getHistory,
};

export default transactionService;