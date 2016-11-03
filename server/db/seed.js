'use strict'

const { connect, disconnect } = require('./database')

const Item = require('../models/Item')
const items = require('./items')

connect()
  .then(() => Item.remove({}))
  .then(() => Item.insertMany(items))
  .then(disconnect)
  .catch(console.error)
