const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    // Get the user data from the DB using the ID from the auth middleware
    const user = await User.findById(req.user.id);

    // Check if user role is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    next(); // Role is admin, proceed
  } catch (err) {
    res.status(500).send('Server Error');
  }
};