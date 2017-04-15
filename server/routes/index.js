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
// POST /admin/events                     | controllers.event.createEvent
// POST /admin/events/:event              | controllers.event.sendInvite
// GET  /admin/events/:event              | controllers.event.checkEvent
// POST /admin/events/:event/tasks        | controllers.task.createTask
// POST /admin/events/:event/tasks/:task  | controllers.task.updateTask

//Standard routes
// GET  /users                            | controllers.user.getAllUsers
// GET  /users/:user                      | controllers.user.signin?

// GET  /events                           | controllers.event.getAllUserEvents
// POST /events/:event                    | controllers.event.updateInvite
// POST /tasks                            | controllers.task.volunteerForTask
// GET  /users/:user/events/:event/tasks  | controllers.task.getTasksUserVolunteeredFor
// GET  /events/:event/tasks              | controllers.task.getEventTasks

//Testing routes
// POST /test/events/:event                 |controllers.test.fakeInviteAnswers
