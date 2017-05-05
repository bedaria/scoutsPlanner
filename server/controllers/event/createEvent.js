'use strict'

const models = require('../../models/index.js')
//Create an event. Creating an event automatically makes the user and admin.
//NEED user id (from authentication)
//req.body should have:
//       {name: <string>,
//        startDateTime: <datetime>,
//        endDateTime: <datetime>,
//        message: <string> (optional),
//        address: <string> (optional),
//        tasks: array<{taskName, volunteerCount}>
//        invited: array<integer>
//res will have: { eventId: <integer> }
const createEvent = function(req, res, next) {
  if(!req.body.name || !req.body.startDateTime || !req.body.endDateTime || !req.body.tasks || !req.body.address || !req.body.invited)
    next(throw400Error(`Must have name, startDateTime, endDateTime, address, tasks and/or message to create event.`))
  else if(!Array.isArray(req.body.tasks) || !Array.isArray(req.body.invited))
    next(throw400Error(`'tasks' and 'invited' must be arrays.`))
  else {
    const createEvent = () => (models.Event.create(req.body))
    const findAdmin = () => {
      return models.User.findOne({
        where: {id: req.user.id}
      })
    }

    req.body.invited.forEach(invitee => {
      if(!Number.isInteger(invitee))
        next(throw400Error(`'invited' must be an array of integers.`))
    })

    const findInvitees = () => {
      return models.User.findAll({
        where: {
          id: {
            $in: req.body.invited
          }
        }
      })
    }

    const createTasks = req.body.tasks.map(task => {
      if(!task.name || !task.volunteersNeeded || !task.startDateTime || !task.endDateTime)
        next(throw400Error(`'task' must be of the form: <array> {name: <string>, volunteersNeeded: <integer>}, startDateTime: <Date> , endDateTime: <Date>`))
      return () => (models.Task.create(task))
    })

    const fns = [createEvent, findAdmin, findInvitees].concat(createTasks)

    Promise.all(fns.map(fn => fn()))
      .then(results => {
        const event = results[0]
        const user = results[1]
        const invited = results[2]
        const tasks = results.slice(3)

        return Promise.all([event.setMainAdmin(user), event.setTasks(tasks), event.addVolunteer(invited)])
      })
      .then(results => {
        const event = results[0]
        res.status(200).json({success: true, eventId: event.dataValues.id})
      })
      .catch(err => { next(err) })
  }
}

const throw400Error = (message) => {
  const err = new TypeError(message)
  err.status = 400
  return err
}

module.exports = createEvent
