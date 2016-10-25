"user strict";

const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require('../models/User')
