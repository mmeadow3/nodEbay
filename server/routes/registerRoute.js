"use strict";

const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const User = require('../models/User');


router.post('/register', ({ body: { username, email, password} }, res, err) => {
	if (password) {
		User.findOne({ username })
			.then(user => {
				if (user) {
					res.json({ msg: 'User is already registered' })
				} else {
					return new Promise((resolve, reject) => {
						bcrypt.hash(password, 5, (err, hash) => {
							if (err) {
								reject(err)
							} else {
								resolve(hash)
							}
						})
					})
				}
			})
			.then(hash => User.create({ username, email, password: hash }))
			.then(() => res.json({ msg: 'User created' }))
			.catch(err)
	}
})
module.exports = router;
