'use strict'

const admin = require('express').Router()
const controllers = require('../controllers/index.js')

admin.param('event_id', (req, res, next, id) => {
  req.event = {id}
  next()
})

admin.post('/events', controllers.event.createEvent)
admin.route('/events/:event_id')
  .post(controllers.event.sendInvite)
  .get(controllers.event.checkEvent)

admin.post('/events/:event_id/tasks', controllers.task.createTask)
// admin.post('/events/:event/tasks/:task_id', controllers.task.updateTask)

module.exports = admin
