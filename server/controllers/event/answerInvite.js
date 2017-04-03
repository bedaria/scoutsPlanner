'use strict'

const models = require('../../models/index.js')
const helpers = require('../helperFunctions.js')
//Updates models.EventVolunteer with isAttending
//INPUT: {isAttending: <valueIn> ['Yes', 'Maybe', 'No']}
//OUTPUT: {isUpdated: <boolean> isUpdated}
const answerInvite = function(req, res) {
  if(!req.body.isAttending || !(['Yes', 'Maybe', 'No'].indexOf(req.body.isAttending) > -1))
    res.json({"error": "Incorrect input."}).status(200).end()
  else if(Number.isInteger(Number(req.params.event)))
    res.json({"error": "Invalid eventId parameter"}).status(200).end()
  else {
    models.User.findOne({
      where: {name: req.user.name},
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

      return helpers.updateEventVolunteer(eventVolunteer, 'isAttending', req.body.isAttending)
    })
    .then(event => {
      res.json({event: event.dataValues,
                message: "Update successful."})
        .status(200).end()
    })
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
      res.status(500).end()
    })
  }
}

module.exports = answerInvite
