require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Sports_Manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected to Sports_Manager'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const teamRoutes = require('./routes/teams');
const matchRoutes = require('./routes/matches');
const userRoutes = require('./routes/users');
const groundRoutes = require('./routes/grounds');
const authRoutes = require('./routes/auth');  // New authentication routes

app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/grounds', groundRoutes);
app.use('/api/auth', authRoutes);  // Add auth routes here

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Sports Manager API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
