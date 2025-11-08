const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Import our guard
const { getMe } = require('../controllers/userController');

// @route   GET /api/user/me
// @desc    Get logged in user's data
// This route is protected. You must have a valid token.
router.get('/me', auth, getMe);

module.exports = router;