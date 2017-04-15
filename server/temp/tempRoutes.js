'use strict'

const router = require('express').Router()
const fakeInviteAnswers = require('./fakeInviteAnswers')

router.post('/events/:event', fakeInviteAnswers)

module.exports = router
