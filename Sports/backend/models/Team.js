const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true }, 
    teamCoach: { type: String, required: true }, 
    numberOfPlayers: { type: Number, required: true },
    players: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
