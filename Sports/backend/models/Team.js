const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true }, // Add city
    teamCoach: { type: String, required: true }, // Add coach
    numberOfPlayers: { type: Number, required: true }, // Add number of players
    players: { type: Array, default: [] }, // Keep players array for future use
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Team', TeamSchema);
