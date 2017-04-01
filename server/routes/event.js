'use strict'

const router = require('express').Router()

const controllers = require('../controllers/event.js')

router.post('/events', controllers.event.create)

module.exports = router
