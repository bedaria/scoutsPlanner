'use strict'

const router = require('express').Router()
const fakeInviteAnswers = require('./fakeInviteAnswers')

router.param('event_id', (req, res, next, id) => {
  req.event = {id}
  next()
})

router.post('/:event_id', fakeInviteAnswers)

module.exports = router
