'use strict'

const models = require('../../models/index.js')

//Adds models.Event to models.User (s) if the users were invited
//req.body should have:
//        {invited: <array<integers>>}
//res will have: {sentTo: <array<Users>>}
const sendInvite = function(req, res) {
  if(!req.user)
    Promise.reject("User not found.")
  if(!req.body.invited || !Array.isArray(req.body.invited))
    res.json({"error": "Attribute invited must be of type array."}).status(200).end()
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

        return event.addVolunteer(users)
      })
      .then(success => {
        //invites have already been sent
        var sentTo = []

        if(Array.isArray(success[0]))
          sentTo = success[0]
        else if(Array.isArray(success))
          sentTo = success

        sentTo = sentTo.map(result => result.dataValues)

        res.json({sentTo: sentTo}).status(200).end()
      })
      .catch(err => {
        console.log(__filename, " ERROR: ", err)
        res.status(500).end()
      })
    }
}

module.exports = sendInvite
