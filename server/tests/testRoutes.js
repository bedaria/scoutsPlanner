'use strict'

const router = require('express').Router()
const fakeInviteAnswers = require('./fakeInviteAnswers')
const fakeLogin = require('./fakeLogin.js')

router.post('/events/:event', fakeInviteAnswers)
router.get('/fakeLogin', fakeLogin)

module.exports = router
