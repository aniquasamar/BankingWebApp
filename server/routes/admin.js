const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { 
    getAllUsers, 
    getAllTransactions,
    updateUserStatus, // Import this
    deleteUser,
    updateUser 
} = require('../controllers/adminController');

// All routes here need BOTH auth and admin checks
router.get('/users', auth, admin, getAllUsers);
router.get('/transactions', auth, admin, getAllTransactions);
router.put('/users/:id/status', auth, admin, updateUserStatus);
router.put('/users/:id', auth, admin, updateUser);
router.delete('/users/:id', auth, admin, deleteUser);

module.exports = router;