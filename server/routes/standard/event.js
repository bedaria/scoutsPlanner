'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.get('/events', controllers.event.getAllUserEvents)
router.post('/events/:event', controllers.event.updateInvite)

module.exports = router
