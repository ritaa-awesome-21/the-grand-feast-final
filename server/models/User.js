const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the blueprint for a user in our database.
const userSchema = new Schema({
  email: {
    type: String,
    required: true, // Every user must have an email
    unique: true,   // No two users can have the same email
    trim: true,     // Removes any extra spaces
    lowercase: true // Stores the email in lowercase
  },
  password: {
    type: String,
    required: true // Every user must have a password
  },
  isAdmin: {
    type: Boolean,
    default: false // Users are not admins by default
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// This creates the 'User' model based on the schema, which we can then use in other files.
const User = mongoose.model('User', userSchema);

module.exports = User;
