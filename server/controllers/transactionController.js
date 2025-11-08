const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Transfer funds
// @route   POST /api/transactions/transfer
exports.transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Start the transaction

  try {
    const { recipientEmail, amount } = req.body;
    const senderId = req.user.id; // From our authMiddleware

    const parsedAmount = parseFloat(amount);

    // 1. Validation
    if (parsedAmount <= 0) {
      throw new Error('Transfer amount must be positive');
    }

    // 2. Find sender and recipient
    const sender = await User.findById(senderId).session(session);
    const recipient = await User.findOne({ email: recipientEmail }).session(session);

    if (!recipient) {
      throw new Error('Recipient not found');
    }
    if (sender.email === recipientEmail) {
      throw new Error('Cannot transfer funds to yourself');
    }
    if (sender.balance < parsedAmount) {
      throw new Error('Insufficient funds');
    }

    // 3. Perform the transfer
    // Debit sender
    sender.balance -= parsedAmount;
    await sender.save({ session });

    // Credit recipient
    recipient.balance += parsedAmount;
    await recipient.save({ session });

    // 4. Log the transaction
    await Transaction.create(
      [
        {
          sender: senderId,
          recipient: recipient._id,
          amount: parsedAmount,
        },
      ],
      { session: session }
    );

    // 5. Commit the transaction
    await session.commitTransaction();
    res.json({ msg: 'Transfer successful' });

  } catch (err) {
    // 6. If anything fails, abort the transaction
    await session.abortTransaction();
    console.error(err.message);
    res.status(400).json({ msg: err.message || 'Transfer failed' });
  } finally {
    // 7. Always end the session
    session.endSession();
  }
};

// @desc    Get transaction history for logged in user
// @route   GET /api/transactions/history
exports.getHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      // Find all transactions where user is sender OR recipient
      $or: [{ sender: req.user.id }, { recipient: req.user.id }],
    })
      .populate('sender', 'name email') // Get sender's name and email
      .populate('recipient', 'name email') // Get recipient's name and email
      .sort({ timestamp: -1 }); // Newest transactions first

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};