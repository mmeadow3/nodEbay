"use strict";

const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/currentUser', (req, res, err) => {
	User
		.findOne({ username: req.session.username })
		.then((user) => {
			res.json(user)
		})
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
  });
});


module.exports = router;
