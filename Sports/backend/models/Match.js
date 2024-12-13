const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    ticketPrice: { type: Number, required: true }, // Add ticket price field
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);
