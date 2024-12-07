const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add a user
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming user ID is in req.user
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
});

module.exports = router;
