'use strict'

const models = require('../../models/index.js')

// Returns all of the Events that a User has been invited and/or is attending to.
//res will have:
//    {
//    userEvents: <array <{
//                   eventInfo: {name, id, startDate, endDate, message, startTime, endTime},
//                   volunteerInfo: {isAttending, volunteeringTill, volunteeringFrom} }>>
//    adminEvents: <array <{id, name, isAdmin}>>
//   }
const getAllUserEvents = function(req, res) {
  if(!req.user || !req.user.id || !req.user.name)
    Promise.reject("User not found.")

  var getAdminEvents = models.Event.findAll({
    where: { mainAdminId: req.user.id }
  })

  var getUserEvents = models.User.findOne({
      where: {name: req.user.name},
      include: [{ model: models.Event }]
  })

  Promise.all([getAdminEvents, getUserEvents])
    .then(results => {
      var adminEvents = results[0]
      var userEvents = results[1]
      var events = []
      var adEvents = []

      if(userEvents === null)
       return Promise.reject("No user: ", req.user.id, "found")

      if(userEvents.dataValues.Events) {
        events = userEvents.dataValues.Events.map(event => {

           const info = event.dataValues
           const volunteer = event.dataValues.EventVolunteer

           const eventInfo = {
             name: info.name,
             id: info.id,
             startDate: info.startDate,
             endDate: info.endDate,
             message: info.message,
             startTime: info.startTime,
             endTime: info.endTime,
           }

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
       adEvents = adminEvents.map(event => ({id: event.dataValues.id, name: event.dataValues.name , isAdmin: true}))

      res.json({adminEvents: adEvents,  userEvents: events}).status(200).end()
    })
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
      res.status(500).end()
    })
}


module.exports = getAllUserEvents
