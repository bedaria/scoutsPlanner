'use strict'

const models = require('../../models/index.js')

// Returns all of the Events that a User has been invited and/or is attending to.
//res will have:
//    {
//    userEvents: <array <{
//                   eventInfo: {name, id, startDate, endDate, message, startTime, endTime, mainAdminId},
//                   volunteerInfo: {isAttending, volunteeringTill, volunteeringFrom} }>>
//    adminEvents: <array <{id, name, isAdmin}>>
//   }
const getAllUserEvents = function(req, res) {
  if(!req.user || !req.user.id || !req.user.name)
    Promise.reject("User must be signed in.")

  var getAdminEvents = models.Event.findAll({
    where: { mainAdminId: req.user.id },
    attributes: ['id', 'name']
  })

  var getUserEvents = models.User.findOne({
      where: {name: req.user.name},
      include: [{
        model: models.Event,
        attributes:  ['name', 'id', 'startDate', 'endDate', 'message', 'startTime', 'endTime', 'mainAdminId']
       }]
  })

  Promise.all([getAdminEvents, getUserEvents])
    .then(results => {
      var adminEvents = results[0]
      var userEvents = results[1]
      var events = []
      var adEvents = []

      if(userEvents.dataValues.Events) {
        events = userEvents.dataValues.Events.map(event => {

           const eventInfo = event.dataValues
           const volunteer = event.dataValues.EventVolunteer

           const volunteerInfo =  {
             volunteeringFrom: volunteer.startTime,
             volunteeringTill: volunteer.endTime,
             isAttending: volunteer.isAttending
           }

           return {
             eventInfo: eventInfo,
             volunteerInfo: volunteerInfo
           }
       })
     }

     if(adminEvents.length > 0)
       adEvents = adminEvents.map(event => ({id: event.dataValues.id, name: event.dataValues.name}))

      res.json({adminEvents: adEvents,  userEvents: events}).status(200).end()
    })
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
      res.status(500).end()
    })
}


module.exports = getAllUserEvents
