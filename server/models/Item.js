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
    type: Number
  },
  finalPrice: Number,
  available: {
    type: Boolean,
    default: true
  },
  imgUrl: {
    data: Buffer,
    type: String
  }
})
