const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/', async (req, res) => {
    const matches = await Match.find();
    res.json(matches);
});

// Add a match
router.post('/', async (req, res) => {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
});

module.exports = router;
