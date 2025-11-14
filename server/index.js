require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/characters');
const campaignRoutes = require('./routes/campaigns');
const abilityRoutes = require('./routes/abilities');
const monsterRoutes = require('./routes/monsters');
const loreRoutes = require('./routes/lore');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/abilities', abilityRoutes);
app.use('/api/monsters', monsterRoutes);
app.use('/api/lore', loreRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Midnight Nation API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
