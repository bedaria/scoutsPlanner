'use strict'

const admin = require('express').Router()
const controllers = require('../controllers/index.js')

admin.post('/events', controllers.event.createEvent)
admin.post('/events/:event', controllers.event.sendInvite)
admin.get('/events/:event', controllers.event.checkEvent)

admin.post('/events/:event/tasks', controllers.task.createTask)
// admin.post('/events/:event/tasks/:task', controllers.task.updateTask)

module.exports = admin


// app.use('/users/:name', authentication.isAuthenticated, routes.standard.event)
// app.use('/users/:name', authentication.isAuthenticated, routes.standard.task)
// app.use('/events/:event', saveEventId, routes.standard.task)
// app.use('/users/admin/:name', authentication.isAdmin, routes.admin.event)
// app.use('/users/admin/:name/events/:event', saveEventId, routes.admin.task )
// app.use('/users/:user/events/:event', saveEventId, routes.standard.task)
