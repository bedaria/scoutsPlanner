'use strict'

const models = require('../models/index.js')

const create = function(req, res){
  //Required: <string> name
  //Optional: <string> startTime,
  //          <string> endTime

  //req will have a req.user.name property from middleware
  if(req.body.name && req.user.name){
    const createEvent = models.Event.create(req.body)
    const findUser = models.User.findOne({where: {name: req.user.name}})

    Promise.all([createEvent, findUser])
      .then(results => {
        const event = results[0]
        const user = results[1]

        if(user)
          return event.setMainAdmin(user)
        else
          throw new Error(`Could not find user ${user}`)
      })
      .then(event =>
        res.json({dataValues: event.dataValues}).status(200).end())
      .catch(err => res.status(500).end())
  }
  else
    res.status(400).end()
}

exports.event = {
  create: create
}
