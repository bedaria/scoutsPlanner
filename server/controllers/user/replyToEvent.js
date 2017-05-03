'use strict'

const models = require('../../models/index.js')

//Updates models.EventVolunteer
//NEED user id (from authentication)
//req.body should have at least one:
//                       {isAttending: <valueIn ['Yes', 'Maybe', 'No']>,
//                        volunteerStartDateTime: <string>, (if isAttending is 'Yes')
//                        volunteerEndDateTime: <string>, (if isAttending is 'Yes')
//                        volunteerTasks: <array<integer>>  (if isAttending is 'Yes')}
//res will have: {success: <boolean>}
const replyToEvent = (req, res, next) => {
  if(!req.body.isAttending)
    next(throw400Error("Must include attending"))
  if(req.body.isAttending === "Yes" && !req.body.volunteerStartDateTime && !req.body.volunteerEndDateTime && !req.body.volunteerTasks)
    next(throw400Error("Missing volunteerStartDateTime, volunteerEndDateTime, volunteerTask."))
  else {
    const updateWith = {
      isAttending: req.body.isAttending,
      seen: true
    }

    if(req.body.isAttending !== 'Yes') {
      updateWith.startDateTime = null
      updateWith.endDateTime = null

      models.EventVolunteer.findOne({
        where: {
          UserId: req.user.id,
          EventId: req.event.id
        }
      })
      .then(currentReply => {
        return currentReply.update(updateWith)
      })
      .then(updated => {
        res.status(200).json({success: true})
      })
      .catch(err => next(err))

    }
    else {
      const getCurrentReply = () =>
        models.EventVolunteer.findOne({
          where: {
            UserId: req.user.id,
            EventId: req.event.id
          }
        })

      const findUser = () =>
        models.User.findOne({
          where: {
            id: req.user.id
          }
        })

      const findTask = () =>
        models.Task.findOne({
          where: {
            id: req.body.volunteerTask.id
          }
      })
      updateWith.startDateTime = req.body.volunteerStartDateTime
      updateWith.endDateTime = req.body.volunteerEndDateTime

      Promise.all([getCurrentReply(), findUser(), findTask()])
        .then(results => {
          const currentReply = results[0]
          const user = results[1]
          const task = results[2]

          const updateReply = () => currentReply.update(updateWith)
          const volunteerForTask = () => user.addTask(task)

          return Promise.all([updateReply(), volunteerForTask()])
        })
        .then(results => {
          console.log('updated reply and added task ')
          res.status(200).json({success: true})
        })
        .catch(err => { next(err) })
    }
  }
}

const throw400Error = (message) => {
  const err = new TypeError(message)
  err.status = 400
  return err
}

module.exports = replyToEvent
