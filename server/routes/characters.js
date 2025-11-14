const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Character = require('../models/Character');

// Get all characters for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const characters = await Character.find({ owner: req.user._id })
      .populate('abilities')
      .populate('campaign');
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching characters', error: error.message });
  }
});

// Get single character
router.get('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    })
      .populate('abilities')
      .populate('campaign');
    
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching character', error: error.message });
  }
});

// Create new character
router.post('/', auth, async (req, res) => {
  try {
    const character = new Character({
      ...req.body,
      owner: req.user._id
    });
    await character.save();
    
    // Add character to user's characters array
    req.user.characters.push(character._id);
    await req.user.save();
    
    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error creating character', error: error.message });
  }
});

// Update character
router.put('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error updating character', error: error.message });
  }
});

// Delete character
router.delete('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting character', error: error.message });
  }
});

module.exports = router;
