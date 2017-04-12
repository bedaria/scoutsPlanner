'use strict'

const models = require('../../models/index.js')

//Adds models.Event to models.User (s) if the users were invited
//req.body should have:
//        {invited: <array<integers>>}
//res will have: {sentTo: <array<UserIds>>}
const sendInvite = function(req, res) {
  if(!req.user)
    Promise.reject(`User should be logged in.`)
  if(!Array.isArray(req.body.invited) || typeof req.body.invited[0] !== 'number')
    res.json({"error": "Attribute invited must be an array of integers."}).status(200).end()
  else if(!Number.isInteger(Number(req.params.event)))
    res.json({"error": "Invalid eventId parameter."}).status(200).end()
  else {
    const invitedUsers = req.body.invited
    const event = req.params.event

    const getUsers = models.User.findAll({where: {id: {$in: invitedUsers}}})
    const getEvent = models.Event.findOne({where: {id: event}})

    Promise.all([getUsers, getEvent])
      .then(results => {
        const users = results[0]
        const event = results[1]

        if(!users.length)
          return Promise.reject(`No users found`)

        return event.addVolunteer(users)
      })
      .then(success => {
        var sentTo = []

        if(Array.isArray(success[0])) //mulitple users invited
          sentTo = success[0]
        else if(Array.isArray(success)) //one user invited
          sentTo = success

        sentTo = sentTo.map(result => result.dataValues.UserId)

        res.json({sentTo}).status(200).end()
      })
      .catch(err => {
        console.log(__filename, " ERROR: ", err)
        res.status(500).end()
      })
    }
}

module.exports = sendInvite
