'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.get('/events', controllers.event.getAllUserEvents)
router.get('/events/:event', controllers.event.getUserEvent)
router.post('/events/:event', controllers.event.answerInvite)

module.exports = router
