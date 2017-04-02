'use strict'

const models = require('../../models/index.js')

//Finds an event a user has been invited to or is attending
//INPUT:
//OUTPUT: {event: models.Event.dataValues, isAttending: <boolean> isAttending}
const findOne = function(req, res) {
  const updateEvent = models.EventVolunteer.update({ seen: true},
    { where: {UserId: req.user.id, EventId: req.params.event}
  })
  const getEvent = models.Event.findOne({ where: { id: req.params.event }})
  const getVolunteerEventInfo = models.EventVolunteer.findOne({
    where: {UserId: req.user.id, EventId: req.params.event}
  })

  Promise.all([updateEvent, getEvent, getVolunteerEventInfo])
    .then(results => {
      const updated = results[0][0]
      const event = results[1]
      const volunteerInfo = results[2]
      const isAttending = volunteerInfo.dataValues.isAttending
      
      if(!updated){
        console.log("(./server/controllers/event/findOne) ERROR: ")
        console.log("Did not update attribute 'seen' correctly for event: ", event, " and user: ", req.user.id)
        res.json({event: "Event not found"}).status(500).end()
      }

      res.json({event: event, isAttending: isAttending }).status(200).end()
    })
    .catch(err => {
      console.log("(./server/controllers/event/findOne) ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = findOne
