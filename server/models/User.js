'use strict'

const mongoose = require('mongoose')

const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

module.exports = mongoose.model('user', {
  email: {
    type: String,
    lowercase: true,
    match: [HTML5_EMAIL_REGEX, 'Please enter a valid email address'],
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  }
})
