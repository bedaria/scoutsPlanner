'use strict'

const router = require('express').Router()
const controllers = require('./controllers/index.js')

// /user is for logged in users
router.param('event_id', (req, res, next, id) => {
  req.event = {id}
  next()
})

router.route('/user')
  .get(controllers.user.getProfile)
  //.put(controllers.user.changeProfile)

router.route('/users')
  .get(controllers.user.getAllUsers)

  router.route('/user/events')
  .post(controllers.event.createEvent)
  .get(controllers.user.getUserEvents)

  // router.route('/user/events/:event_id')
  // .get(controllers.event.getAdminEventVolunteers)
  // .put(controllers.event.updateEvent)
  // .delete(controllers.event.deleteEvent)

// router.route('/events/:event_id/reply')
//   .put(controllers.user.updateInvite)

// router.route('/events/:event_id/tasks')
//   .post(controllers.task.createTask)
//   .get(controllers.task.getEventTasks)
  // .delete(controllers.task.deleteEventTasks)

// router.router('/events/:event_id/tasks/task_id')
  // .put(controllers.task.updateTask)
  // .get(controllers.task.getTask)



module.exports = router
