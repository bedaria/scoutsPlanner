'use strict'

const models = require('../../models/index.js')

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
    models.EventVolunteer.findOne({
      where: {
        UserId: req.user.id,
        EventId: req.event.id
      }
    })

  //Get all event tasks
  const findEventTasks = () =>
    models.Event.findOne({
      where: {
        id: req.event.id
      },
      include: [{
        model: models.Task,
        attributes: ['id']
      }]
    })

  //Get all event tasks the volunteer already signed up for
  const findCurrentTasks = () =>
    models.User.findOne({
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

  Promise.all([findEventTasks(), findCurrentTasks(), findInvite()])
    .then(results => {
      const eventTasks = results[0].dataValues.Tasks
      const currentTasks = results[1].map(event => event.dataValues.VolunteerTask)
      const invite = results[2]

      if(!invite)  //make sure user has been invited to event
        next(throw400Error("User can't volunteer for this event."))
      else {
        //Create object out of eventTasks for easy access to event tasks
        const allTasks = eventTasks.reduce((obj, task) => {
          obj[task.dataValues.id] = task
          return obj
        }, {})
        //delete user from task
        const deleteUserFrom = (userTask) => {
          return () =>
          models.sequelize.transaction(t =>
            userTask.destroy({transaction: t})
            .then(() => {
              const task = allTasks[userTask.dataValues.TaskId]
              return task.decrement('volunteerCount', {by: 1}, {transaction: t})
            })
          )
        }
        var toUpdate = [] //will hold Promises for all the updates that need to be made

        //if user can't go to event, delete user from any tasks he/she signed up for previously
        if(req.body.isAttending !== 'Yes' && currentTasks.length)
            toUpdate = toUpdate.concat(currentTasks.map(currentTask => deleteUserFrom(currentTask)))
        else { //if user can go
          //Create object out of req.body.volunteerTasks array for easy access to tasks
          const volunteerFor = req.body.volunteerTasks.reduce((obj, task) => {
            obj[task.id] = {
              startDateTime: task.volunteerStartDateTime,
              endDateTime: task.volunteerEndDateTime
            }
            return obj
          }, {})
          //filter out tasks from eventTasks that user is not volunteering for
          const filteredEventTasks = eventTasks.filter(task => !!volunteerFor[task.dataValues.id])

          //make sure all tasks to be added/updated belong to event
          if(req.body.isAttending === "Yes" && filteredEventTasks.length !== req.body.volunteerTasks.length)
            next(throw400Error("Incorrect tasks."))
          else {
            //update/delete tasks the user already volunteered for
            var updateTasks = []
            if(currentTasks.length)
              updateTasks = currentTasks.map(currentTask => {
                //delete task if user un-signed from it
                if(!volunteerFor[currentTask.dataValues.TaskId])
                  return deleteUserFrom(currentTask)
                
                //otherwise update task times
                const startDateTime = volunteerFor[currentTask.dataValues.TaskId].startDateTime
                const endDateTime  = volunteerFor[currentTask.dataValues.TaskId].endDateTime

                //delete task from volunteerFor to not add it back in later
                delete volunteerFor[currentTask.dataValues.TaskId]

                return () =>
                  currentTask.update({
                    startDateTime,
                    endDateTime
                  })
              })

            //add new tasks user signed up for
            var addTasks = []
            for(var taskId in volunteerFor) {
              const id = taskId
              addTasks.push(
                () =>
                  models.sequelize.transaction(t =>
                    models.VolunteerTask.create({
                      UserId: req.user.id,
                      TaskId: id,
                      startDateTime: volunteerFor[id].startDateTime,
                      endDateTime: volunteerFor[id].endDateTime
                    }, { transaction: t})
                    .then(results => {
                      const task = allTasks[id]
                      return task.increment('volunteerCount', {by: 1}, {transaction: t})
                    })
                  )
              )
            }

            toUpdate = updateTasks.concat(addTasks)
          }
        }

        //update isAttending and seen attributes
        if(!invite.dataValues.seen || invite.dataValues.isAttending !== req.body.isAttending) {
          const updateAnswer = () =>
            invite.update({
              isAttending: req.body.isAttending,
              seen: true
            })

          toUpdate.push(updateAnswer)
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
