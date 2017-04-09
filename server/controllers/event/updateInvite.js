'use strict'

const models = require('../../models/index.js')
//Updates models.EventVolunteer
//req.body should have at elast one:
//                       {isAttending: <valueIn ['Yes', 'Maybe', 'No']>,
//                        startTime: <string>,
//                        endTime: <string>,
//                        seen: boolean }
//res will have: {message: "Update successful", volunteerInfo: <models.EventVolunteer>}
const updateInvite = function(req, res) {
  if(!req.user)
    Promise.reject("User not found.")

  if(!req.body.isAttending && !req.body.startTime && !req.body.endTime && !req.body.seen)
    res.json({"error": "Req body must have isAttending, startTime, endTime or seen."}).status(200).end()

  if(req.body.isAttending && (['Yes', 'Maybe', 'No'].indexOf(req.body.isAttending) === -1))
    res.json({"error": "isAttending must be in ['Yes', 'Maybe', 'No']."}).status(200).end()

  if((req.body.startTime && !req.body.endTime) || (req.body.endTime && !req.body.startTime))
    res.json({"error": "Please provide both a startTime and an endTime for volunteer attendance."}).status(200).end()

  if(req.body.startTime && req.body.endTime && (typeof req.body.startTime !== 'string' || typeof req.body.endTime !== 'string'))
    res.json({"error": "Volunteer startTime and endTime must be of type string."}).status(200).end()

  if(req.body.seen && typeof req.body.seen !== 'boolean')
    res.json({"error": "seen must be a boolean."}).status(200).end()

  if(!Number.isInteger(Number(req.params.event)))
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
      if(!user)
        Promise.reject("User not found.")

      const eventInfo = user.dataValues.Events[0]
      const eventVolunteer = eventInfo.dataValues.EventVolunteer

      console.log("sending in: ", req.body)
      return eventVolunteer.update(req.body)
    })
    .then(update => {
      console.log("sendint: ", update.dataValues)
      res.json({message: "Update successful.", volunteerInfo: update.dataValues})
        .status(200).end()
    })
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
      res.status(500).end()
    })
  }
}

module.exports = updateInvite
