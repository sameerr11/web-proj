const mongoose = require('mongoose');

const GroundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: Number,
    facilities: [String],
});

module.exports = mongoose.model('Ground', GroundSchema);
