'use strict'

const mongoose = require('mongoose')



module.exports = mongoose.model('item', {
  name: {
    type: String,
    lowercase: true
  }
})
