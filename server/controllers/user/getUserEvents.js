'use strict'

const models = require('../../models/index.js')

//Gets all the events a user has been invited to.
//NEED user id (from authentication)
//res will have:
//    userEvents:
//    <array <{
//              info: {
//                  name <string>,
//                  id <number>,
//                  startDateTime <datetime>,
//                  endDateTime <datetime>
//              }
//              answer: {
//                  isAttending <boolean>
//            }
const getUserEvents = (req, res) => {
  const query = {
    where: {id: req.user.id},
    include: [{
      model: models.Event,
      attributes: ['id', 'mainAdminId', 'name', 'startDateTime', 'endDateTime', 'message', 'address'],
      order: ['startDateTime', 'ASC']
    }]
   }

  models.User.findOne(query)
   .then(user => {
     var events = []
     user.dataValues.Events.forEach(event => {
       console.log("event: ", event.dataValues.startDateTime)
     })
     if(user.dataValues.Events.length)
      events = user.dataValues.Events.map(event => {
        return {
          isAdmin: event.dataValues.mainAdminId === req.user.id,
          name: event.dataValues.name,
          id: event.dataValues.id,
          startDateTime: event.dataValues.startDateTime,
          endDateTime: event.dataValues.endDateTime,
          answer: event.dataValues.EventVolunteer.dataValues.isAttending
        }
      })
    res.json({success: true, events}).status(200).end()
   })
}

module.exports = getUserEvents
