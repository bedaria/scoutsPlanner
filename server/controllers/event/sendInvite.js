'use strict'

const models = require('../../models/index.js')

//Adds models.Event to models.User (s) if the users were invited
//req.body should have:
//        {invited: <array<integers>>}
//res will have: {sentTo: <array<UserIds>>}
const sendInvite = function(req, res) {

  if(!Array.isArray(req.body.invited) || typeof req.body.invited[0] !== 'number')
    res.json({"error": "Attribute invited must be an array of integers."}).status(200).end()
  else {
    const invitedUsers = req.body.invited
    const event = req.params.event

    const getUsers = () => (
      models.User.findAll({
        where: {
          id: {
            $in: invitedUsers
          }
        }
      })
    )
    const getEvent = () => (
      models.Event.findOne({
        where: {
          id: event
        }
      })
    )

    Promise.all([getUsers(), getEvent()])
      .then(results => {
        const users = results[0]
        const event = results[1]

        return event.addVolunteer(users)
      })
      .then(success => {
        var sentTo = []

        if(Array.isArray(success[0])) //mulitple users invited
          sentTo = success[0]
        else if(Array.isArray(success)) //one user invited
          sentTo = success

        sentTo = sentTo.map(result => result.dataValues.UserId)

        if(sentTo.length !== invitedUsers.length)
          return Promise.reject(`Not everyone got the invites, expected: ${invitedUsers}, got: ${sentTo}`)
        else
          res.json({"success": true}).status(200).end()
      })
    }
}

module.exports = sendInvite
