const express = require('express');
const router = express.Router();
const Ability = require('../models/Ability');

// Get all abilities
router.get('/', async (req, res) => {
  try {
    const abilities = await Ability.find().sort({ level: 1, name: 1 });
    res.json(abilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching abilities', error: error.message });
  }
});

// Get single ability
router.get('/:id', async (req, res) => {
  try {
    const ability = await Ability.findById(req.params.id);
    
    if (!ability) {
      return res.status(404).json({ message: 'Ability not found' });
    }
    
    res.json(ability);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ability', error: error.message });
  }
});

module.exports = router;
