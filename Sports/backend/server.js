const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
const teamRoutes = require('./routes/teams');
const matchRoutes = require('./routes/matches');

app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const groundRoutes = require('./routes/grounds');
app.use('/api/grounds', groundRoutes);
