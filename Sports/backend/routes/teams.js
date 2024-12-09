const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
    const teams = await Team.find();
    res.json(teams);
});

// Add a team
// Add a team with city and teamCoach
// Add a team with city, teamCoach, and numberOfPlayers
router.post('/', async (req, res) => {
    try {
        const { name, city, teamCoach, numberOfPlayers } = req.body; // Destructure all fields from the request body

        // Create a new team document
        const team = new Team({
            name,
            city,
            teamCoach,
            numberOfPlayers,
            players: [], // Keep players empty initially
        });

        await team.save(); // Save to the database
        res.status(201).json(team); // Return the saved team
    } catch (error) {
        res.status(400).json({ message: 'Failed to add team', error: error.message });
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
