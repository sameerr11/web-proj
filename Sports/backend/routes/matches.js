const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Ground = require('../models/Ground');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

// Get all matches
router.get('/', async (req, res) => {
    const matches = await Match.find({}, { teamA: 1, teamB: 1, venue: 1, date: 1, ticketPrice: 1 });
    res.json(matches);
});

router.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Body:`, req.body); 
    next();
});

// Add a new match
router.post('/', async (req, res) => {
    const { teamA, teamB, venue, date, time, ticketPrice } = req.body;

    if (!teamA || !teamB || !venue || !date || !time || ticketPrice == null) {
        return res.status(400).json({ message: 'All fields are required, including ticket price.' });
    }

    try {
        // Fetch the ground by venue to get its capacity
        const ground = await Ground.findOne({ name: venue });
        if (!ground) {
            return res.status(404).json({ message: `Ground with name "${venue}" not found.` });
        }

        // Create a new match with seatsAvailable set to ground capacity
        const match = new Match({
            teamA,
            teamB,
            venue,
            date,
            time,
            ticketPrice,
            seatsAvailable: ground.capacity, // Set seatsAvailable to ground capacity
        });

        await match.save();
        res.status(201).json(match);
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: 'Error creating match', error });
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

// Update seats after buying tickets
// Deduct ticket price from the wallet
router.post('/buy-ticket/:id', authenticate, async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const ticketPrice = match.ticketPrice;

        if (user.wallet.balance < ticketPrice) {
            return res.status(400).json({ message: 'Insufficient balance for this ticket' });
        }

        // Deduct the ticket price from the wallet
        user.wallet.balance -= ticketPrice;
        await user.save();

        // Update match seat availability
        if (match.seatsAvailable > 0) {
            match.seatsAvailable -= 1;
            await match.save();
            return res.status(200).json({ message: 'Ticket purchased successfully', match });
        }

        res.status(400).json({ message: 'No seats available' });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
    }
});

module.exports = router;
