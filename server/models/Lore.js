const mongoose = require('mongoose');

const loreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['history', 'location', 'faction', 'deity', 'legend', 'other']
  },
  content: {
    type: String,
    required: true
  },
  relatedLore: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lore'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

loreSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lore', loreSchema);
