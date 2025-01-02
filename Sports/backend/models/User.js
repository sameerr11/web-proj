const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'manager' },
    profilePicture: { type: String, default: '' },
    wallet: {
        balance: { type: Number, default: 0 },
        currency: { type: String, default: 'USD' },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
