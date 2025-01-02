const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
    const teams = await Team.find();
    res.json(teams);
});

router.post('/', async (req, res) => {
    try {
        const { teamA, teamB, venue, date, time, ticketPrice } = req.body;
        if (!ticketPrice || ticketPrice <= 0) {
            return res.status(400).json({ message: 'Invalid ticket price' });
        }

        const match = new Match({ teamA, teamB, venue, date, time, ticketPrice });
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Error saving match', error });
    }
});




router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,       // Get the team ID from the URL parameter
            req.body,             // Use the request body to update the team
            { new: true }         // Return the updated document
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json(updatedTeam);  // Send back the updated team
    } catch (err) {
        res.status(400).json({ message: 'Failed to update team', error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);

        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete team', error: err.message });
    }
});




module.exports = router;
