'use strict'

const models = require('../../models/index.js')

//Adds models.Event to models.User (s) if the users were invited
//NEED event id (from router.param)
//req.body should have:
//        {invited: <array<integers>>}
//res will have: {sentTo: <array<UserIds>>}
const sendInvite = function(req, res) {
  if(!Array.isArray(req.body.invited) || typeof req.body.invited[0] !== 'number')
    res.json({success: false, error: "'invited' must be an array of integers."}).status(400).end()
  else {
    const invitedUsers = req.body.invited
    const eventId = req.event.id
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
          id: eventId
        }
      })
    )

    Promise.all([getUsers(), getEvent()])
      .then(results => {
        const users = results[0]
        const event = results[1]
        return event.addVolunteer(users)
      })
      .then(volunteers => {
        res.json({success: true}).status(200).end()
      })
    }
}

module.exports = sendInvite
