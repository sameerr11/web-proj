const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/', async (req, res) => {
    const matches = await Match.find({}, { teamA: 1, teamB: 1, venue: 1, date: 1, ticketPrice: 1 });
    res.json(matches);
});


router.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Body:`, req.body); 
    next();
});

router.post('/', async (req, res) => {
    const { teamA, teamB, venue, date, time, ticketPrice } = req.body;

    console.log('POST body received:', req.body); 

    if (!teamA || !teamB || !venue || !date || !time || ticketPrice == null) {
        console.log('Validation failed. Missing required fields.');
        return res.status(400).json({ message: 'All fields are required, including ticket price.' });
    }

    try {
        const match = new Match({ teamA, teamB, venue, date, time, ticketPrice });
        await match.save();
        console.log('Match saved:', match); 
        res.status(201).json(match);
    } catch (error) {
        console.error('Error saving match:', error);
        res.status(500).json({ message: 'Error saving match', error });
    }
});




router.get('/upcoming', async (req, res) => {
    try {
        const matches = await Match.find({ date: { $gte: new Date() } }).sort('date');
        res.json(matches);
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.status(500).json({ message: 'Error fetching matches' });
    }
});

// Update seats after buying tickets (optional)
router.post('/buy-ticket/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: 'Match not found' });
        if (match.seatsAvailable > 0) {
            match.seatsAvailable -= 1;
            await match.save();
            res.json({ message: 'Ticket purchased', match });
        } else {
            res.status(400).json({ message: 'No seats available' });
        }
    } catch (err) {
        console.error('Error buying ticket:', err);
        res.status(500).json({ message: 'Error buying ticket' });
    }
});

module.exports = router;
