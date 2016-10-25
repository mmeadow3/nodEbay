"use strict";

const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const User = require('../models/User');

router.post('/register', ({ body: { username, email, password } }, res, err) => {
		return new Promise((resolve, reject) => {
				bcrypt.hash(password, 10, (err, hash) => {
						if (err) {
							reject(err)
					} else {
							resolve(hash)
							}
						})
					})
			.then(hash => User.create({ username, email, password: hash }))
			.then((user) => res.json(user))
			.catch(err)
})

module.exports = router;
