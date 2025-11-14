const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
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
    enum: ['passive', 'active', 'reaction'],
    required: true
  },
  damage: {
    type: String,
    default: ''
  },
  range: {
    type: String,
    default: ''
  },
  cost: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ability', abilitySchema);
