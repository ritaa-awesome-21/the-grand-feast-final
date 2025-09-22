const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// --- DATABASE CONNECTION ---
const dbURI = process.env.dbURI;

mongoose.connect(dbURI)
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection error:', err));


const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders');
const recommendationRoutes = require('./routes/recommendations');

const app = express();
const PORT = process.env.PORT || 5000;

// --- NEW CORS CONFIGURATION ---
const corsOptions = {
  origin: 'https://the-grand-feast.netlify.app/', // <-- PASTE YOUR NETLIFY URL HERE
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// This middleware will log every incoming request to your console.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Received ${req.method} request for ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

