const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', async (req, res) => {
    const { username, feedback } = req.body;
    console.log("Feedback received:", req.body);

    try {
        const db = mongoose.connection.db;

        // Check if the 'feedbacks' collection exists
        const collections = await db.listCollections().toArray();
        const feedbackCollectionExists = collections.some((col) => col.name === 'feedbacks');

        if (!feedbackCollectionExists) {
            console.log('Creating feedbacks collection...');
            await db.createCollection('feedbacks');
        }

        // Save feedback
        const newFeedback = new Feedback({ username, feedback });
        const savedFeedback = await newFeedback.save();
        console.log("Feedback saved:", savedFeedback);

        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ message: 'Failed to submit feedback' });
    }
});

// Fetch all feedback
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ message: 'Failed to fetch feedbacks.' });
    }
});

module.exports = router;
