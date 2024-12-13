const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/', async (req, res) => {
    const matches = await Match.find({}, { teamA: 1, teamB: 1, venue: 1, date: 1, ticketPrice: 1 });
    res.json(matches);
});


router.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Body:`, req.body); // Logs all requests
    next();
});

router.post('/', async (req, res) => {
    const { teamA, teamB, venue, date, time, ticketPrice } = req.body;

    console.log('POST body received:', req.body); // Debugging log

    if (!teamA || !teamB || !venue || !date || !time || ticketPrice == null) {
        console.log('Validation failed. Missing required fields.');
        return res.status(400).json({ message: 'All fields are required, including ticket price.' });
    }

    try {
        const match = new Match({ teamA, teamB, venue, date, time, ticketPrice });
        await match.save();
        console.log('Match saved:', match); // Confirms save success
        res.status(201).json(match);
    } catch (error) {
        console.error('Error saving match:', error);
        res.status(500).json({ message: 'Error saving match', error });
    }
});




router.get('/upcoming', async (req, res) => {
    try {
        const upcomingMatches = await Match.find({ date: { $gte: new Date() } }).sort('date');
        res.json(upcomingMatches);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch upcoming matches' });
    }
});

module.exports = router;
