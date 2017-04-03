'use strict'

const models = require('../../models/index.js')

// Returns all of the Events that a User has been invited and/or is attending to.
//INPUT:
//OUTPUT: {events: <array> models.Events.dataValues}
const getAllUserEvents = function(req, res) {

  models.User.findOne({
    where: {name: req.user.name},
    include: [{ model: models.Event }]
  })
  .then(user => {
    var events = []
    if(user.dataValues.Events)
      events = user.dataValues.Events.map(event => event.dataValues)

    res.json({events: events}).status(200).end()
  })
  .catch(err => {
    console.log(__filename, " ERROR: ", err)
    res.status(500).end()
  })

}

module.exports = getAllUserEvents
