'use strict'

const models = require('../../models/index.js')

//Gets all the events a user has been invited to.
const getInvites = (req, res) => {
  models.User.findOne({
    where: {name: req.user.name},
    include: [{
      model: models.Event,
      attributes:  ['name', 'id', 'startDate', 'endDate', 'message', 'startTime', 'endTime']
     }]
   })
   .then(user => {
     var userEvents = []

     if(user.dataValues.Events)
       userEvents = user.dataValues.Events.map(event => event.dataValues)

    res.json({success: true, userEvents: events}).status(200).end()
   })
}

module.exports = getInvites
