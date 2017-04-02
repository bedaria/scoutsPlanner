'use strict'

const models = require('../../models/index.js')

//Finds an event a user has been invited to or is attending
//INPUT: <integer> userId (required)
//       <integer> eventId (required)
//OUTPUT: models.Event
const findOne = function(req, res) {
  const updateEvent = models.EventVolunteer.update({ seen: true},
    { where: {UserId: req.user.id, EventId: req.params.event}
  })
  const getEvent = models.Event.findOne({ where: { id: req.params.event }})

  Promise.all([updateEvent, getEvent])
    .then(results => {
      const updated = results[0][0]
      const event = results[1]

      if(!updated){
        console.log("(./server/controllers/event/findOne) ERROR: ")
        console.log("Did not update attribute 'seen' correctly for event: ", event, " and user: ", req.user.id)
        res.json({event: "Event not found"}).status(500).end()
      }

      res.json({event: event}).status(200).end()
    })
    .catch(err => {
      console.log("(./server/controllers/event/findOne) ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = findOne