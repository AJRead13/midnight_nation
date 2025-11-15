const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  race: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
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
    current: { type: Number, default: 10 },
    max: { type: Number, default: 10 }
  },
  abilities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ability'
  }],
  backstory: {
    type: String,
    default: ''
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

characterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Character', characterSchema);
