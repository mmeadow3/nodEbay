"use strict";

const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const User = require('../models/User');

router.post('/login', ({ session, body: { username, password } }, res, err) => {
	User.findOne({ username })
		.then(user => {
			if (user) {
				return new Promise((resolve, reject) => {
					bcrypt.compare(password, user.password, (err, matches) => {
						if (err) {
							reject(err)
						} else {
							resolve(user)
						}
					})
				})
			} else {
				res.json({ msg: 'User name does not exist in our system' })
			}
		})
		.then((user) => {
				if (user) {
					session.username = username
					res.json({user: user.username})
				} 
			})
			.catch(err)
})



module.exports = router;
