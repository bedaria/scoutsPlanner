'use strict'

const models = require('../../models/index.js')

//Updates models.EventVolunteer
//req.body should have at elast one:
//                       {isAttending: <valueIn ['Yes', 'Maybe', 'No']>,
//                        startTime: <string>,
//                        endTime: <string>}
//res will have: {success: <boolen>, volunteerInfo: <models.EventVolunteer>}
const answerInvite = (req, res) => {

  if(!req.body.isAttending)
    res.json({success: false, error: "Req body must have isAttending"}).status(200).end()

  if(req.body.isAttending === "Yes" && !req.body.startTime && !req.body.endTime)
    res.json({success: false, error: "Please provide both a startTime and an endTime for volunteer who is attending."}).status(200).end()
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

      return eventVolunteer.update(req.body)
    })
    .then(update => {
      res.json({success: true}).status(200).end()
    })
  }
}

module.exports = answerInvite
