'use strict'

const router = require('express').Router()
const fakeReplies = require('./fakeReplies')

router.param('event_id', (req, res, next, id) => {
  req.event = {id}
  next()
})

router.post('/:event_id', fakeReplies)

module.exports = router
