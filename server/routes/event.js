'use strict'

const express = require('express')
var router = express.Router()

var controllers = require('../controllers/event.js')

router.post('/events', controllers.event.create)

module.exports = router
