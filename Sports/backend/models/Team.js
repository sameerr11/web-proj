const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    players: [
        {
            name: { type: String, required: true },
            age: { type: Number, required: true },
            position: { type: String, required: true },
            stats: { type: Object, default: {} },
        },
    ],
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Team', TeamSchema);
