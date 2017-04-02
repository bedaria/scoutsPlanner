'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.get('/', controllers.user.findAllUsers)

module.exports = router
