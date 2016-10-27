"use strict";

const { Router } = require('express')
const router = Router()
const Item = require('../models/Item')

router.get('/api/items', (req, res, err) =>
  Item
    .find()
    .then(item => res.json( item ))
    .catch(err)
)

////////just returning a single id by its id//////////
router.get('/api/items/:_id', (req, res, err) =>
  Item
    .findById(req.params._id)
    .then((item) => res.json( item ))
    .catch(err)
)

 router.post('/api/items', (req, res, err) => {
   Item
   .create(req.body)
   .then((items) => res.json(items))
   .catch(err);
  });

router.put('/api/items/:_id', (req, res, err) => {
  if (req.body.price < 500) {
	Item
	.findOneAndUpdate({ _id:req.params._id }, {$set: { price: req.body.price}})
	.then((item) => res.json(item))
	.catch(err)
} else {
  Item
  .findOneAndUpdate({ _id:req.params._id }, {$set: { price: req.body.price, available: false}})
  .then((item) => res.json(item))
  .catch(err)
}
})


module.exports = router
