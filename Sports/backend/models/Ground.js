const mongoose = require('mongoose');

const GroundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, default: 0 },
    facilities: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Ground', GroundSchema);
