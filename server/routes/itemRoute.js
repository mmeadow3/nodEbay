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
  if (req.body.currentPrice < 500) {
	   Item
	    .findOneAndUpdate({ _id:req.params._id }, {$set: { currentPrice: req.body.currentPrice}})
	    .then((item) => res.json(item))
	    .catch(err)
} else if (req.body.finalPrice > 499){
  Item
    .findOneAndUpdate({ _id:req.params._id }, {$set: { winner: req.body.winner, finalPrice: req.body.finalPrice, currentPrice: req.body.currentPrice, available: false}}, {upsert: true, new: true})
    .then((item) => res.json(item))
    .catch(err)
  } else if (req.body.available === false) {
  Item
    .findOneAndUpdate({ _id:req.params._id }, {$set: {  winner: req.body.winner, finalPrice: req.body.finalPrice, currentPrice: req.body.currentPrice, available: false}}, {upsert: true, new: true})
    .then((item) => res.json(item))
    .catch(err)
  }
})


module.exports = router
