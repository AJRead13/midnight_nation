const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  challenge: {
    type: Number,
    required: true
  },
  stats: {
    strength: { type: Number, default: 10 },
    dexterity: { type: Number, default: 10 },
    constitution: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    wisdom: { type: Number, default: 10 },
    charisma: { type: Number, default: 10 }
  },
  health: {
    type: Number,
    required: true
  },
  abilities: [{
    name: String,
    description: String
  }],
  loot: [{
    item: String,
    chance: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Monster', monsterSchema);
