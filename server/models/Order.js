const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is a small, nested blueprint for the items within an order.
const orderItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// This is the main blueprint for a completed order.
const orderSchema = new Schema({
  // This links the order to the user who placed it.
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This must match the model name we used in User.js
    required: true
  },
  // This stores all the items that were in the cart.
  items: [orderItemSchema], // An array of items, using the blueprint above
  total: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  status: {
    type: String,
    default: 'Pending' // e.g., Pending, Confirmed, Out for Delivery, Delivered
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt'
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
