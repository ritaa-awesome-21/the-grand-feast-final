const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const MenuItem = require('../models/MenuItem');

// Initialize the Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   GET api/recommendations
// @desc    Get AI-powered menu recommendations
// @access  Public
router.get('/', async (req, res) => {
  try {
    // 1. Fetch the full menu from the database
    const menuItems = await MenuItem.find();
    if (menuItems.length < 3) { // Need at least 3 items to recommend 3
      return res.json([]); // Return empty if there are not enough menu items
    }

    // 2. Format the menu for the AI prompt
    // We create a simple, readable list for the AI
    const menuForPrompt = menuItems.map(item => 
        `- ${item.nameKey} (${item.isVeg ? 'Veg' : 'Non-Veg'})`
    ).join('\n');

    // 3. Create the prompt for the Gemini AI
    const prompt = `
      You are a helpful and friendly chef at an Indian restaurant called "The Grand Feast".
      Based on the following menu, please recommend 3 popular dishes that would make a great, well-rounded meal (e.g., an appetizer, a main course, and a dessert or drink).
      Only return the exact "nameKey" for each of the 3 recommended dishes, separated by commas. Do not add any other text or explanation.

      Menu:
      ${menuForPrompt}

      Example response: paneerTikkaName,biryaniName,gulabJamunName
    `;

    // 4. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recommendedKeysText = response.text().trim();

    // 5. Process the AI's response
    const recommendedKeys = recommendedKeysText.split(',').map(key => key.trim());
    
    // Find the full menu item objects that match the keys recommended by the AI
    const recommendedItems = menuItems.filter(item => recommendedKeys.includes(item.nameKey));

    res.json(recommendedItems);

  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
