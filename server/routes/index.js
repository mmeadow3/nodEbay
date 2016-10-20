"use strict";


const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require('../models/user')

router.post("/login")

router.get("api/avaibleItems")
router.get("api/:username")

module.exports = router
