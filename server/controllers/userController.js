const User = require('../models/User');

// @desc    Get logged in user data
// @route   GET /api/user/me
exports.getMe = async (req, res) => {
  try {
    // req.user.id comes from the authMiddleware
    // We remove the password from the data we send back
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};