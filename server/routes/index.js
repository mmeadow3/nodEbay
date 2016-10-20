"use strict";


const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
// const User = require('../models/user')


router.get('/currentUserObj', (req, res, err) => {
	User
		.findOne({ username: req.session.username })
		.then((user) => {
			res.json(user)
		})
})

module.exports = router
