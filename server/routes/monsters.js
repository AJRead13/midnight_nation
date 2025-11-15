const express = require('express');
const router = express.Router();
const Monster = require('../models/Monster');

// Get all monsters
router.get('/', async (req, res) => {
  try {
    const monsters = await Monster.find().sort({ challenge: 1, name: 1 });
    res.json(monsters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monsters', error: error.message });
  }
});

// Get single monster
router.get('/:id', async (req, res) => {
  try {
    const monster = await Monster.findById(req.params.id);
    
    if (!monster) {
      return res.status(404).json({ message: 'Monster not found' });
    }
    
    res.json(monster);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monster', error: error.message });
  }
});

module.exports = router;
