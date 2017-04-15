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
// POST /users/admin/:user/events                     | controllers.event.createEvent
// POST /users/admin/:user/events/:event              | controllers.event.sendInvite
// GET  /users/admin                                  | controllers.user.getAllUsers
// GET  /users/admin/:user/events/:event              | controllers.event.checkEvent
// POST /users/admin/:user/events/:event/tasks/:task  | controllers.task.updateTask
// POST /users/admin/:user/events/:event/tasks        | controllers.task.createTask

//Standard routes
// GET  /users/:user/events                | controllers.event.getAllUserEvents
// POST /users/:user/events/:event         | controllers.event.updateInvite
// POST /users/:user/tasks                 | controllers.task.volunteerForTask
// GET  /users/:user/events/:event/tasks   | controllers.task.getTasksUserVolunteeredFor
// GET  /events/:event/tasks                | controllers.task.getEventTasks

//Testing routes
// POST /test/events/:event                 |controllers.test.fakeInviteAnswers
