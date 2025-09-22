const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Import the MenuItem model
const auth = require('../middleware/authmiddleware'); // For protecting routes

// @route   GET api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // This route is correct
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/menu
// @desc    Add a new menu item
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    // CHANGED: Added 'nutrition' to the fields we get from the request body
    const { nameKey, descriptionKey, price, categoryKey, imageUrl, isVeg, nutrition } = req.body;

    const newItem = new MenuItem({
      nameKey,
      descriptionKey,
      price,
      categoryKey,
      imageUrl,
      isVeg,
      nutrition // ADDED: Pass the new nutrition object to the database model
    });

    const menuItem = await newItem.save();
    res.status(201).json(menuItem);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/menu/:id
// @desc    Update a menu item
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        // CHANGED: We now explicitly define the fields to ensure 'nutrition' is included.
        const { nameKey, descriptionKey, price, categoryKey, imageUrl, isVeg, nutrition } = req.body;

        // Build a new object with the fields from the request
        const updatedFields = {
            nameKey,
            descriptionKey,
            price,
            categoryKey,
            imageUrl,
            isVeg,
            nutrition
        };

        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id, 
            { $set: updatedFields }, // Use the new object to update the item
            { new: true }
        );
        
        if (!updatedItem) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }
        res.json(updatedItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/menu/:id
// @desc    Delete a menu item
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }
        await item.deleteOne();
        res.json({ msg: 'Menu item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;