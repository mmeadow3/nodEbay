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
router.get('/api/users/:_id', (req, res, err) => {
	User
	.findById(req.params._id)
	.then((user) => res.json( user ))
	.catch(err)
});


router.post('/api/users', (req, res, err) => {
	User
	.create(req.body)
	.then(users => res.json(users))
	.catch(err)
});

router.put('/api/users/:_id', (req, res, err) => {
	User
	.findOneAndUpdate({ _id:req.params._id }, {$push: { itemsWon: (req.body.itemsWon)}})
	.then((user) => res.json(user))
	.catch(err)
});

///////no need to update user info (yet)/////////////

///////no need to delete user info (yet)/////////////


module.exports = router
