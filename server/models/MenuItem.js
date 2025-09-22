// server/models/MenuItem.js

const mongoose = require('mongoose'); // THIS LINE WAS LIKELY MISSING OR INCORRECT

const menuItemSchema = new mongoose.Schema({
  nameKey: { type: String, required: true },
  descriptionKey: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  categoryKey: { type: String, required: true },
  isVeg: { type: Boolean, default: true },

  // The nutrition object you added
  nutrition: {
    energy_kcal: { type: Number, default: 0 },
    protein_g: { type: Number, default: 0 },
    carbs_g: { type: Number, default: 0 },
    total_sugars_g: { type: Number, default: 0 },
    total_fat_g: { type: Number, default: 0 },
    saturated_fat_g: { type: Number, default: 0 },
    trans_fat_g: { type: Number, default: 0 },
    sodium_mg: { type: Number, default: 0 }
  }
  
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);