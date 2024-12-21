<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

=======
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
>>>>>>> 5a2ce8918b69bf13f055d7809bf26b96dfd4b192
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
    .then(() => {
        console.log('MongoDB connected to Sports_Manager');
        console.log(`Connected to database: ${mongoose.connection.name}`);
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const teamRoutes = require('./routes/teams');
const matchRoutes = require('./routes/matches');
const userRoutes = require('./routes/users');
const groundRoutes = require('./routes/grounds');
const authRoutes = require('./routes/authRoutes');
<<<<<<< HEAD
const feedbackRoutes = require('./routes/feedback');
=======
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import feedback routes
>>>>>>> 5a2ce8918b69bf13f055d7809bf26b96dfd4b192

app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/grounds', groundRoutes);
app.use('/api/auth', authRoutes);
<<<<<<< HEAD
app.use('/api/feedback', feedbackRoutes);
=======
app.use('/api/feedback', feedbackRoutes); // Add feedback route
>>>>>>> 5a2ce8918b69bf13f055d7809bf26b96dfd4b192

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Sports Manager API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
