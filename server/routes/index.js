"use strict";


const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()

router.use(require('./userRoute'))
router.use(require('./itemRoute'))







module.exports = router
