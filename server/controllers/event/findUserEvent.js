'use strict'

const models = require('../../models/index.js')

//Updates seen attribute to true in an eventVolunteer instance
//INPUT: <models.EventVolunteer> eventVolunteer
//OUTPUT:
const updateEventVolunteer = function(eventVolunteer) {
  eventVolunteer.update({seen: true})
    .then(updated => {
        console.log(__filename, ":")
        console.log(eventInfo.name, " for ", user.dataValues.name, "successfully updated")
    })
    .catch(err => {
      console.log("ERROR: ", err)
    })
}

//Finds an event a user has been invited to or is attending
//INPUT:
//OUTPUT: {event: models.Event.dataValues, isAttending: <boolean> isAttending}
const findUserEvent = function(req, res) {
  models.User.findOne({
    where: {id: req.user.id},
    include: [{
      model: models.Event,
      through: {
        where: {EventId: req.params.event}
      }
    }]
  })
  .then(user => {
    const eventInfo = user.dataValues.Events[0]
    const eventVolunteer = eventInfo.dataValues.EventVolunteer
    const eventVolunteerInfo = eventVolunteer.dataValues

    if(!eventVolunteer.seen)
      updateEventVolunteer(eventVolunteer)

    res.json({event: eventInfo,
             isAttending: eventVolunteerInfo.isAttending})
      .status(200).end()
  })
  .catch(err => {
    console.log("ERROR: ", err)
    res.status(500).end()
  })
}

module.exports = findUserEvent
