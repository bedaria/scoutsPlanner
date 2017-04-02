'use strict'

const models = require('../../models/index.js')

//Adds events to a user if they were invited
//INPUT: <array<integers>> arrayOfUserIds
//       <integer> eventId
//OUTPUT: <array> invitees
const sendInvite = function(req, res) {
  const invitedUsers = JSON.parse(req.body.invited)// <array<integers>>
  const event = req.params.event

  const getUsers = models.User.findAll({where: {id: {$in: invitedUsers}}})
  const getEvent = models.Event.findOne({where: {id: event}})

  Promise.all([getUsers, getEvent])
    .then(results => {
      const users = results[0]
      const event = results[1]

      return event.addUser(users)
    })
    .then(success => {
      //invites have already been sent
      var sentTo = {sentTo: []}

      if(success)
        sentTo = success[0].map(result => result.dataValues)

      res.json({sentTo: sentTo}).status(200).end()
    })
    .catch(err => {
      console.log("(.server/controllers/event/sendInvite) ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = sendInvite
