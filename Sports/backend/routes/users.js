const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add a user
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

module.exports = router;
