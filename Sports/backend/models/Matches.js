const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    teamA: String,
    teamB: String,
    venue: String,
    date: Date,
    time: String,
});

module.exports = mongoose.model('Match', MatchSchema);
