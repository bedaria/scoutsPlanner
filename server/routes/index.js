'use strict'

const fs = require('fs')
const path = require('path')
const admin = require('./admin/index.js')
const standard = require('./standard/index.js')

module.exports = {
  admin: admin,
  standard: standard
}

//Admin routes
// POST /users/admin/:user/events        | controllers.event.createEvent
// POST /users/admin/:user/events/:event | controllers.event.sendInvite
// GET  /users/admin                     | controllers.user.getAllUsers
// GET /users/admin/:user/events/event   | controllers.event.checkEvent

//Standard routes
// GET  /users/:user/events               | controllers.event.getAllUserEvents
// GET  /users/:user/events/:event        | controllers.event.getUserEvent
// POST /user/:user/events/:event         | controllers.event.answerInvite
