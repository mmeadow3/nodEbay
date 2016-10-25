'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model('item', {
  name: {
    type: String,
    lowercase: true,
    index: { unique: true }
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
})
