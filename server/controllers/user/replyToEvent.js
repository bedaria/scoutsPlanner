'use strict'

const db = require('../../models/index.js')

//Updates user answer, volunteerCount in tasks, and user tasks
//NEED user id (from authentication), event id (from parameter)
//req.body:{
//           isAttending: <valueIn ['Yes', 'Maybe', 'No']>, (required)
//           volunteerTasks: <array <{  (required if isAttending is 'Yes')
//              id,
//              volunteerStartDateTime,
//              volunteerEndDateTime>
//           }>>
//res will have: {success: <boolean>}
const replyToEvent = (req, res, next) => {
  if(!req.body.isAttending)
    return next(throw400Error("Must include 'isAttending'"))
  if(req.body.isAttending === "Yes" && !req.body.volunteerTasks)
    return next(throw400Error("Missing 'volunteerTasks'"))
  if(req.body.isAttending === "Yes" && !Array.isArray(req.body.volunteerTasks))
    return next(throw400Error("volunteerTasks must be an array."))

  //Find volunteer invited to event
  const findInvite = () =>
    db.EventVolunteer.findOne({
      where: {
        UserId: req.user.id,
        EventId: req.event.id
      }
    })

  //Get all event tasks the volunteer already signed up for
  const findCurrentTasks = () =>
    db.User.findOne({
      where: {
        id: req.user.id
      }
    })
    .then(user =>
      user.getTasks({
        where: {
          EventId: req.event.id
        }
      })
    )

  Promise.all([findCurrentTasks(), findInvite()])
    .then(results => {
      const currentTasks = results[0].map(event => event.dataValues.VolunteerTask)
      const invite = results[1]

      if(!invite)  //make sure user has been invited to event
        next(throw400Error("User can't volunteer for this event."))
      else {
        //function to delete user from a task
        const deleteUserFrom = (userTask) => {
          return () =>
            db.sequelize.transaction(t =>
              userTask.destroy({transaction: t})
                .then(() =>
                  db.Task.findOne({
                    where: {
                      id: userTask.dataValues.TaskId
                    }
                  }, {transaction: t})
                )
                .then(task =>
                  task.decrement('volunteerCount', {by: 1}, {transaction: t})
                )
            )
        }
        //function to add user to a task
        const addUserTo = (userTask, taskId) => {
          return () =>
            db.sequelize.transaction(t =>
              db.VolunteerTask.create({
                UserId: req.user.id,
                TaskId: taskId,
                startDateTime: userTask.startDateTime,
                endDateTime: userTask.endDateTime
              }, { transaction: t})
              .then(results =>
                db.Task.findOne({
                  where: {
                    id: taskId
                  }
                }, {transaction: t})
              )
              .then(task =>
                task.increment('volunteerCount', {by: 1}, {transaction: t})
              )
            )

        }
        //will hold Promises for all the updates that need to be made
        var toUpdate = []

        //if user can't go to event, delete user from any tasks he/she signed up for previously
        if(req.body.isAttending !== 'Yes') {
          if(currentTasks.length)
            toUpdate = toUpdate.concat(currentTasks.map(currentTask => deleteUserFrom(currentTask)))
        }
        else { //if user can go
          //Create object out of req.body.volunteerTasks array for easy access to tasks
          const volunteerFor = req.body.volunteerTasks.reduce((obj, task) => {
            obj[task.id] = {
              startDateTime: task.volunteerStartDateTime,
              endDateTime: task.volunteerEndDateTime
            }
            return obj
          }, {})

          //update/delete tasks the user already volunteered for
          if(currentTasks.length)
            currentTasks.forEach(currentTask => {
              const taskId = currentTask.dataValues.TaskId

              //delete task if user un-signed from it
              if(!volunteerFor[taskId])
                toUpdate.push(deleteUserFrom(currentTask))
              else {
                //otherwise update task times
                const startDateTime = volunteerFor[taskId].startDateTime
                const endDateTime  = volunteerFor[taskId].endDateTime

                //delete task from volunteerFor to not add it back in later
                delete volunteerFor[taskId]

                toUpdate.push(() => currentTask.update({startDateTime, endDateTime }))
              }
            })

          //add new tasks user signed up for
          for(var taskId in volunteerFor) {
            const id = taskId //addUserTo returns async  fn so need to save id in closure
            toUpdate.push(addUserTo(volunteerFor[taskId], id))
          }
        }

        //update isAttending and seen attributes
        if(!invite.dataValues.seen || invite.dataValues.isAttending !== req.body.isAttending) {
          toUpdate.push(
            () =>
              invite.update({
                isAttending: req.body.isAttending,
                seen: true
              })
          )
        }

        return Promise.all(toUpdate.map(fn => fn()))
      }
    })
    .then(() => {
      res.status(200).json({success: true})
    })
    .catch(err => { next(err) })
}

const throw400Error = (message) => {
  const err = new TypeError(message)
  err.status = 400
  return err
}

module.exports = replyToEvent
