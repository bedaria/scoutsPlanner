'use strict'

const models = require('../../models/index.js')
const helpers = require('../helperFunctions.js')
//Finds an event a user has been invited to or is attending
//INPUT:
//OUTPUT: {event: models.Event.dataValues, isAttending: <boolean> isAttending}
const getUserEvent = function(req, res) {
  if(!Number.isInteger(Number(req.params.event)))
    res.send({"error": "Invalid evendId parameter."}).status(200).end()
  else {
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
        helpers.updateEventVolunteer(eventVolunteer, 'seen', true)

      res.json({event: eventInfo,
               isAttending: eventVolunteerInfo.isAttending})
        .status(200).end()
    })
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
      res.status(500).end()
    })
  }
}

module.exports = getUserEvent
