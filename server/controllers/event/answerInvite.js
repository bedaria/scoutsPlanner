'use strict'

const models = require('../../models/index.js')

//Updates models.EventVolunteer with isAttending
//INPUT: {isAttending: <valueIn> ['Yes', 'Maybe', 'No']}
//OUTPUT: {isUpdated: <boolean> isUpdated}
const answerInvite = function(req, res) {
  models.EventVolunteer.update({isAttending: req.body.isAttending}, {
    where: {UserId: req.user.id, EventId: req.params.event}
  })
    .then(answer => {
      if(answer[0] === 1)
        res.json({isUpdated: true}).status(200).end()
      else
        res.json({isUpdated: false}).status(200).end()
    })
    .catch(err => {
      console.log("ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = answerInvite
