const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // Import the Reservation model
const auth = require('../middleware/authmiddleware'); // Import the auth middleware

// @route   POST api/reservations
// @desc    Create a new reservation
// @access  Private (requires login)
router.post('/', auth, async (req, res) => {
  try {
    const { name, contact, guests, date, time, occasion } = req.body;

    const newReservation = new Reservation({
      user: req.user.id, // Get user ID from the auth token
      name,
      contact,
      guests,
      date,
      time,
      occasion,
    });

    const reservation = await newReservation.save();
    res.status(201).json({ message: 'Reservation successful!', reservation });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/reservations
// @desc    Get all reservations (for admin)
// @access  Private (requires login)
router.get('/', auth, async (req, res) => {
    // Note: We would add extra logic here to ensure only an admin can see all reservations.
    // For now, any logged-in user can see all of them for testing.
    try {
        const reservations = await Reservation.find().sort({ date: -1 }); // Sort by most recent
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
