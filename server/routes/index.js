"use strict";


const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require('../models/user')


router.get('/api/:username', (req, res, err) => {
 	  const Username = req.params.username
 	  User
 	  .findOne({ username: Username })
 	  .then(user => res.json(user))
 	  .catch(err)
 })


// router.get('/api', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });

module.exports = router
