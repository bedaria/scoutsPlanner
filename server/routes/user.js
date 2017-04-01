'use strict'

const router = require('express').Router()

const controllers = require('../controllers/user.js')

router.get('/users', controllers.user.findAll)

module.exports = router
