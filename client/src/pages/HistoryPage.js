import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import transactionService from '../services/transactionService';
import userService from '../services/userService'; // We need this to get the user's ID

// Import MUI components for the table
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';

// Helper function to format the date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null); // To store logged-in user's data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user data and transaction history at the same time
        const [userResponse, historyResponse] = await Promise.all([
          userService.getUserData(),
          transactionService.getHistory(),
        ]);
        
        setUser(userResponse.data);
        setTransactions(historyResponse.data);
      } catch (err) {
        setError('Could not fetch transaction history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography>Loading History...</Typography>
        </Container>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transaction History
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {!loading && transactions.length === 0 && (
          <Alert severity="info">You have no transactions yet.</Alert>
        )}

        {/* We only render the table if we have a user and transactions */}
        {!loading && user && transactions.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => {
                  // Logic to determine if it was a sent or received transaction
                  const isSent = tx.sender._id === user._id;
                  const amount = isSent ? -tx.amount : tx.amount;
                  const description = isSent
                    ? `Transfer to ${tx.recipient.name}`
                    : `Transfer from ${tx.sender.name}`;
                  
                  return (
                    <TableRow key={tx._id}>
                      <TableCell>{formatDate(tx.timestamp)}</TableCell>
                      <TableCell>{description}</TableCell>
                      <TableCell 
                        align="right"
                        // Add color: red for sent, green for received
                        sx={{ color: isSent ? 'red' : 'green', fontWeight: 'bold' }}
                      >
                        {isSent ? '-' : '+'}${tx.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
}

export default HistoryPage;