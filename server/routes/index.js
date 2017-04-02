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

//Standard routes
// GET /users/:user/events               | controllers.event.findAll
// GET /users/:user/events/:event        | controllers.event.findOne
// Get /users                            | controllers.users.findAll
