"user strict";

const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/api/users', (req, res, err) => {
	User
	.find()
	.then(users => res.json(users))
	.catch(err)
});


router.post('/api/users', (req, res, err) => {
	User
	.create(req.body)
	.then(users => res.json(users))
	.catch(err)
});


router.get('/currentUser', (req, res, err) => {
	User
		.findOne({ username: req.session.username })
		.then((user) => {
			res.json(user)
		})
})

///////no need to update user info (yet)/////////////

///////no need to delete user info (yet)/////////////


module.exports = router
