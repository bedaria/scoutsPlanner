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
// POST /users/admin/:user/events        | controllers.event.create
// POST /users/admin/:user/events/:event | controllers.event.sendInvite
// GET  /users/admin/                    | controllers.user.findAll
// GET /users/admin/:user/events/event   | controllers.event.checkEvent

//Standard routes
// GET  /users/:user/events               | controllers.event.findAll
// GET  /users/:user/events/:event        | controllers.event.findOne
// POST /user/:user/events/:event         | controllers.event.answerInvite
