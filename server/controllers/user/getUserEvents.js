'use strict'

const models = require('../../models/index.js')

//Gets all the events a user has been invited to.
//NEED user id (from authentication)
//res will have:
//    userEvents:
//    <array <{
//              {
//                isAdmin: <boolean>,
//                name <string>,
//                id <number>,
//                startDateTime <datetime>,
//                endDateTime <datetime>,
//                answer: ['Yes', 'Maybe', 'No', null],
//                userTasks: []
//                eventTasks: [{id, name, description}]
//            }
const getUserEvents = (req, res, next) => {
  const query = {
    where: {id: req.user.id},
    order: [[models.Event, 'startDateTime', 'ASC']],
    include: [{
      model: models.Event,
      attributes: ['id', 'mainAdminId', 'name', 'startDateTime', 'endDateTime', 'message', 'address'],
      include: [{
        model: models.Task,
        attributes: ['id', 'name', 'description', 'volunteerCount', 'volunteersNeeded']
      }]
    }, {
      model: models.Task,
      attributes: ['id', 'name', 'description', 'volunteerCount', 'volunteersNeeded']
    }]
   }

  models.User.findOne(query)
   .then(user => {
     var events = []
     if(user.dataValues.Events.length)
      events = user.dataValues.Events.map(event => {
        return {
          isAdmin: event.dataValues.mainAdminId === req.user.id,
          name: event.dataValues.name,
          id: event.dataValues.id,
          startDateTime: event.dataValues.startDateTime,
          endDateTime: event.dataValues.endDateTime,
          eventTasks: event.dataValues.Tasks.map(task => task.dataValues),
          answer: event.dataValues.EventVolunteer.dataValues.isAttending,
          volunteerStartDateTime: event.dataValues.EventVolunteer.dataValues.startDateTime,
          volunteerEndDateTime: event.dataValues.EventVolunteer.dataValues.endDateTime,
          volunteerTasks: user.Tasks
        }
      })

      res.json({success: true, events}).status(200).end()
    })
    .catch(err => { next(err) })
}

module.exports = getUserEvents
