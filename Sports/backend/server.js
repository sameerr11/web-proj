require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Sports_Manager')
    .then(() => {
        console.log('✅ MongoDB connected to Sports_Manager');
        console.log(`Connected to database: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.error('❌ Error connecting to MongoDB:', err);
        process.exit(1); // Exit process on critical error
    });

// Routes
const teamRoutes = require('./routes/teams');
const matchRoutes = require('./routes/matches');
const userRoutes = require('./routes/users');
const groundRoutes = require('./routes/grounds');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedback');

app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/grounds', groundRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Sports Manager API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
