const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { transfer, getHistory } = require('../controllers/transactionController');

// @route   POST /api/transactions/transfer
// @desc    Transfer funds
router.post('/transfer', auth, transfer);

// @route   GET /api/transactions/history   <-- ADD THIS ROUTE
// @desc    Get user's transaction history
router.get('/history', auth, getHistory);

module.exports = router;