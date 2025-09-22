// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose'); // Added Mongoose

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders'); // <-- ADD THIS LINE
const recommendationRoutes = require('./routes/recommendations'); 

// --- DATABASE CONNECTION ---
// Replace <password> with the password you saved from MongoDB Atlas
const dbURI = 'mongodb+srv://kalesaisucharitha_db_user:sai@cluster0.cs2yaw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection error:', err));
// --- END OF DATABASE CONNECTION ---


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// This middleware will log every incoming request to your console.
app.use((req, res, next) => {
 console.log(`[${new Date().toISOString()}] Received ${req.method} request for ${req.url}`);
 next();
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes); // <-- AND ADD THIS LINE
app.use('/api/recommendations', recommendationRoutes); 

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
