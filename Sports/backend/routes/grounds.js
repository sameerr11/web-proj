const express = require('express');
const router = express.Router();
const Ground = require('../models/Ground');

// Get all grounds
router.get('/', async (req, res) => {
    const grounds = await Ground.find();
    res.json(grounds);
});

// Add a ground
router.post('/', async (req, res) => {
    const ground = new Ground(req.body);
    await ground.save();
    res.status(201).json(ground);
});

module.exports = router;
