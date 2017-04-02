'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.get('/events', controllers.event.findAll)
router.get('/events/:event', controllers.event.findOne)

module.exports = router
