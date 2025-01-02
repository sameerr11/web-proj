const express = require('express');
const router = express.Router();
const Ground = require('../models/Ground');

// Get all grounds
router.get('/', async (req, res) => {
    const grounds = await Ground.find();
    res.json(grounds);
    try {
        const grounds = await Ground.find();
        res.json(grounds); // Return the list of all grounds
    } catch (error) {
        console.error('Error fetching grounds:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new ground
router.post('/', async (req, res) => {
    const ground = new Ground(req.body);
    await ground.save();
    res.status(201).json(ground);
    try {
        const { name, location, capacity, facilities } = req.body;

        // Create a new ground instance
        const ground = new Ground({
            name,
            location,
            capacity,
            facilities: facilities.split(',').map((f) => f.trim()), // Split comma-separated facilities
        });

        // Save the new ground to the database
        await ground.save();
        res.status(201).json(ground); // Return the created ground
    } catch (error) {
        console.error('Error adding ground:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a ground by ID
router.delete('/:id', async (req, res) => {
    try {
        const groundId = req.params.id;
        console.log('Deleting ground with ID:', groundId); // Add this line
        const deletedGround = await Ground.findByIdAndDelete(groundId);

        if (!deletedGround) {
            return res.status(404).json({ message: 'Ground not found' });
        }

        res.status(200).json({ message: 'Ground deleted successfully' });
    } catch (error) {
        console.error('Error deleting ground:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
