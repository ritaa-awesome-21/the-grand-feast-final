const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/authmiddleware');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, deliveryAddress } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
      deliveryAddress,
    });

    const order = await newOrder.save();
    res.status(201).json(order);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/orders
// @desc    Get all orders (for admin)
// @access  Private
router.get('/', auth, async (req, res) => {
    // In a real production app, you would add a check here
    // to ensure that req.user.isAdmin is true.
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Get newest orders first
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/orders/myorders
// @desc    Get all orders for the logged-in user
// @access  Private
router.get('/myorders', auth, async (req, res) => {
    try {
        // Find orders that belong to the user ID from the auth token
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
