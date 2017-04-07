'use strict'

const models = require('../../models/index.js')

//Create an event. Creating an event automatically makes the user and admin.
//req.body should have:
//       {name: <string>,
//        startTime: <string>,
//        endTime: <string>,
//        startDate: <string>,
//        endDate: <string>
//        message: <string> (optional)}
//res will have: { dataValues: models.Event.dataValues }
const createEvent = function(req, res){
  if(!req.body.name || !req.body.startTime || !req.body.endTime || !req.body.startDate)
    res.json({"error": "Incorrect input."}).status(200).end()
  else {
    const createEvent = models.Event.create(req.body)
    const findUser = models.User.findOne({where: {name: req.user.name}})

    Promise.all([createEvent, findUser])
      .then(results => {
        const event = results[0]
        const user = results[1]

        return event.setMainAdmin(user)
      })
      .then(event =>
        res.json({dataValues: event.dataValues}).status(200).end()
      )
      .catch(err => {
        console.log(__filename, " ERROR: ", err)
        res.status(500).end()
      })
  }
}

module.exports= createEvent
