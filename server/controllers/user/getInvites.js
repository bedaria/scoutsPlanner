'use strict'

const models = require('../../models/index.js')

//Gets all the events a user has been invited to.
const getInvites = (req, res) => {
  models.User.findOne({
    where: {id: req.user.id},
    include: [{
      model: models.Event,
      attributes:  ['name', 'id']
     }]
   })
   .then(user => {
     var userEvents = []

     if(user.dataValues.Events)
       userEvents = user.dataValues.Events.map(event => event.dataValues)

    res.json({success: true, userEvents}).status(200).end()
   })
}

module.exports = getInvites
