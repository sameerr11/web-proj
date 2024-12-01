const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: String,
    players: [
        {
            name: String,
            age: Number,
            position: String,
            stats: String,
        },
    ],
});

module.exports = mongoose.model('Team', TeamSchema);
