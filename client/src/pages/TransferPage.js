import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import transactionService from '../services/transactionService';

// Import MUI components
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';

function TransferPage() {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // This logic is 100% the same
  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await transactionService.transferFunds(
        recipientEmail,
        amount
      );
      setMessage(response.data.msg); // "Transfer successful"
      setRecipientEmail('');
      setAmount('');

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Transfer failed';
      setError(errorMsg);
    }
  };

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Typography component="h1" variant="h5">
            Transfer Funds
          </Typography>
          <Box component="form" onSubmit={handleTransfer} sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Recipient's Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount ($)"
              type="number"
              id="amount"
              inputProps={{ min: 0.01, step: 0.01 }} // HTML5 validation
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            
            {message && (
              <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                {message}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Money
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default TransferPage;