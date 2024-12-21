const express = require('express');
const Feedback = require('../models/FeedbackModel');

const router = express.Router();

// Route to submit feedback
router.post('/', async (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        return res.status(400).json({ message: 'Feedback is required' });
    }

    try {
        const newFeedback = new Feedback({ feedback });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
