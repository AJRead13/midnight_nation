const express = require('express');
const router = express.Router();
const Lore = require('../models/Lore');

// Get all lore
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const lore = await Lore.find(query).populate('relatedLore', 'title category');
    res.json(lore);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lore', error: error.message });
  }
});

// Get single lore entry
router.get('/:id', async (req, res) => {
  try {
    const lore = await Lore.findById(req.params.id).populate('relatedLore', 'title category');
    
    if (!lore) {
      return res.status(404).json({ message: 'Lore not found' });
    }
    
    res.json(lore);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lore', error: error.message });
  }
});

module.exports = router;
