'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.post('/events', controllers.event.create)
router.post('/events/:event', controllers.event.sendInvite)
router.get('/events/:event', controllers.event.checkEvent)

module.exports = router
