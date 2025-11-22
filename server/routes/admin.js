const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getAllUsers, getAllTransactions } = require('../controllers/adminController');

// All routes here need BOTH auth and admin checks
router.get('/users', auth, admin, getAllUsers);
router.get('/transactions', auth, admin, getAllTransactions);

module.exports = router;