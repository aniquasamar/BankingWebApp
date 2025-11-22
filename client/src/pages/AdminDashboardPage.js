import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import adminService from '../services/adminService';

// MUI Components
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
  Tabs,
  Tab,
  Box,
  Chip,
  Button,
  IconButton, // Import
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Icon
import BlockIcon from '@mui/icons-material/Block';   // Import Icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

function AdminDashboardPage() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user'
  });

  // Fetch data when component loads
  useEffect(() => {
    fetchUsers();
    fetchTransactions();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminService.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await adminService.getAllTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await adminService.updateUserStatus(id);
      // Update the local state so the UI changes immediately without refresh
      setUsers(users.map(user => 
        user._id === id ? { ...user, isActive: res.data.isActive } : user
      ));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error updating status');
    }
  };

  // *** ADD HANDLER: DELETE USER ***
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    try {
      await adminService.deleteUser(id);
      // Remove the user from local state
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error deleting user');
    }
  };

  const handleEditClick = (user) => {
    setEditUser({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    setOpenEdit(true);
  };

  // *** ADD HANDLE SAVE CHANGES ***
  const handleSaveEdit = async () => {
    try {
      const res = await adminService.updateUser(editUser.id, {
        name: editUser.name,
        email: editUser.email,
        role: editUser.role
      });

      // Update local list
      setUsers(users.map(u => (u._id === editUser.id ? res.data : u)));
      
      setOpenEdit(false); // Close modal
    } catch (err) {
      alert(err.response?.data?.msg || 'Error updating user');
    }
  };

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Admin Panel</Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Users" />
            <Tab label="All Transactions" />
          </Tabs>
        </Box>

        {/* TAB 1: USERS LIST */}
        {tabValue === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell> {/* New Column */}
                  <TableCell align="right">Actions</TableCell> {/* New Column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={user.role === 'admin' ? 'secondary' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                    
                    {/* STATUS COLUMN */}
                    <TableCell>
                      <Chip 
                        label={user.isActive ? 'Active' : 'Inactive'} 
                        color={user.isActive ? 'success' : 'error'} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>

                    {/* ACTIONS COLUMN */}
                    <TableCell align="right">
                      {/* Do not show actions for the admin themselves */}
                      {user.role !== 'admin' && (
                        <>

                          <Tooltip title="Edit User">
                            <IconButton
                              onClick={() => handleEditClick(user)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={user.isActive ? "Deactivate" : "Activate"}>
                            <IconButton 
                              onClick={() => handleToggleStatus(user._id)} 
                              color={user.isActive ? 'warning' : 'success'}
                            >
                              {user.isActive ? <BlockIcon /> : <CheckCircleIcon />}
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete User">
                            <IconButton 
                              onClick={() => handleDelete(user._id)} 
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* TAB 2: TRANSACTIONS LIST (Kept same) */}
        {tabValue === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>{new Date(tx.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.sender ? tx.sender.email : 'Unknown'}</TableCell>
                    <TableCell>{tx.recipient ? tx.recipient.email : 'Unknown'}</TableCell>
                    <TableCell align="right">${tx.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            label="Role"
            fullWidth
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminDashboardPage;