'use strict'

const standard = require('express').Router()
const controllers = require('../controllers/index.js')
const authenticate = require('../middleware/authentication.js')

standard.get('/users', controllers.user.getAllUsers)
standard.get('/events', authenticate, controllers.event.getAllUserEvents)
standard.post('/events/:event', controllers.event.updateInvite)
standard.get('/tasks', controllers.task.getEventTasks)
standard.post('/tasks', controllers.task.volunteerForTask)

module.exports = standard

//Standard routes
// GET  /users                            | controllers.user.getAllUsers
// GET  /users/:user/events/:event/tasks  | controllers.task.getTasksUserVolunteeredFor

// app.use('/users/:name', authentication.isAuthenticated, routes.standard.event)
// app.use('/users/:name', authentication.isAuthenticated, routes.standard.task)
// app.use('/events/:event', saveEventId, routes.standard.task)
// app.use('/users/admin/:name', authentication.isAdmin, routes.admin.event)
// app.use('/users/admin/:name/events/:event', saveEventId, routes.admin.task )
// app.use('/users/:user/events/:event', saveEventId, routes.standard.task)
