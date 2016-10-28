'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model('item', {
  name: {
    type: String,
    lowercase: true,
    index: { unique: true }
  },
  startingPrice: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  finalPrice: Number,
  available: {
    type: Boolean,
    default: true
  }
})
