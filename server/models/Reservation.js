const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the blueprint for a reservation in our database.
const reservationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  guests: {
    type: Number,
    required: true
  },
  date: {
    type: String, // Storing as a string for simplicity, but Date type is also an option
    required: true
  },
  time: {
    type: String,
    required: true
  },
  occasion: {
    type: String,
    trim: true
  },
  // This links the reservation to the user who made it.
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This must match the model name we used in User.js
    required: true
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt'
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
