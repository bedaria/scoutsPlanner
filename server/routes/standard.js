'use strict'

const standard = require('express').Router()
const controllers = require('../controllers/index.js')

standard.param('event_id', (req, res, next, id) => {
  req.event = {id}
  next()
})

standard.get('/users', controllers.user.getAllUsers)
standard.get('/events', controllers.event.getAllUserEvents)
standard.post('/events/:event_id', controllers.event.updateInvite)
standard.route('/tasks')
  .get(controllers.task.getEventTasks)
  .post(controllers.task.volunteerForTask)

module.exports = standard
