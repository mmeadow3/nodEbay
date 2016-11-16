"use strict";


const { Router } = require('express');
const router = Router();

router.use(require('./registerRoute'));
router.use(require('./loginRoute'));
router.use(require('./sessionRoute'));
//////////guard function will go here//////////
router.use((req, res, next) => {
	if (req.session.username) {
		next()
	} else {
		res.redirect("/")
	}
})

router.use(require('./userRoute'));
router.use(require('./itemRoute'));


module.exports = router;
