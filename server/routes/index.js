"use strict";


const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require('../models/User')
const Item = require('../models/Item')



router.get('/api/items', (req, res, err) =>
  Item
    .find()
    .then(item => res.json({ item })) /////just putting item into object
    .catch(err)
)


 router.post("/api/items", (req, res, err) => {
  //  const item = req.params
   Item
   .create(req.body)
   .then((items) => res.json(items))
   .catch(err);
  });




  // router.get('/api/:username', (req, res, err) => {
  //   const Username = req.params.username
  //   User
  //   .findOne({ username: Username })
  //   .then(user => res.json(user))
  //   .catch(err)
  // })


module.exports = router
