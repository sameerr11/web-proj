const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Authentication Middleware
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = { id: user._id }; // Set the user ID in the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

// Set up Multer for image uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile-pictures'); // Folder where profile pictures will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Filename to avoid overwriting
    }
});

const upload = multer({ storage });

// Register a User
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
});

// Get Authenticated User Data
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
});

// Update Wallet Balance
router.patch('/update-wallet', authenticate, async (req, res) => {
    try {
        const { balance } = req.body;

        // Validate balance
        if (typeof balance !== 'number' || balance < 0) {
            return res.status(400).json({ message: 'Invalid balance value' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update wallet balance
        user.wallet.balance = balance;
        await user.save();

        res.status(200).json({ message: 'Wallet updated successfully', wallet: user.wallet });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update wallet', error: error.message });
    }
});

// Update Profile Picture
router.patch('/update-profile-picture', authenticate, upload.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's profile picture field with the new file path
        user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
        await user.save();

        res.status(200).json({ message: 'Profile picture updated successfully', profilePicture: user.profilePicture });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile picture', error: error.message });
    }
});

// Export Router
module.exports = router;
