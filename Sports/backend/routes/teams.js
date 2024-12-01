const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
    const teams = await Team.find();
    res.json(teams);
});

// Add a new team
router.post('/', async (req, res) => {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
});

module.exports = router;
