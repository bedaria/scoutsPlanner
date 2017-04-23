'use strict'

const router = require('express').Router()
const controllers = require('./controllers/index.js')

router.param('event_id', (req, res, next, id) => {
  req.event = {id}
  next()
})

router.route('/users/profile')
  .get(controllers.user.getProfileInfo)
// .put(controllers.user.changeProfilePicture)

router.route('/users')
  .get(controllers.user.getAllUsers)

router.route('/invites/:event_id')
  .post(controllers.user.answerInvite)

router.route('/events')
  .post(controllers.event.createEvent)
  .get(controllers.user.getUserEvents)

router.route('/events/:event_id')
  .get(controllers.event.getAdminEventVolunteers)
  // .put(controllers.event.updateEvent)
  // .delete(controllers.event.deleteEvent)

router.route('/events/:event_id/tasks')
  .post(controllers.task.createTask)
  .get(controllers.task.getEventTasks)
  // .delete(controllers.task.deleteEventTasks)

// router.router('/events/:event_id/tasks/task_id')
  // .put(controllers.task.updateTask)
  // .get(controllers.task.getTask)

router.route('/events/:event_id/invites')
  .post(controllers.event.sendInvites)
  //.get(controllers.events.getInvitees)
  //.post(controllers.events.updateInvites)

module.exports = router
