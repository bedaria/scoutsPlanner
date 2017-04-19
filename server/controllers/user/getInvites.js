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
//                  startTime <string>,
//                  endTime <string>,
//                  startDate <string>,
//                  endDate <string>}
//              answer: {
//                  isAttending <string>,
//                  startTime<string>,
//                  endTime <string>}
//            }
const getInvites = (req, res) => {
  models.User.findOne({
    where: {id: req.user.id},
    include: [{
      model: models.Event,
      attributes:  ['name', 'id', 'startTime', 'endTime', 'startDate', 'endDate']
     }]
   })
   .then(user => {
     var userEvents = []
     if(user.dataValues.Events.length)
      userEvents = user.dataValues.Events.map(event => {
        return {
          info: {
            name: event.dataValues.name,
            id: event.dataValues.id,
            startTime: event.dataValues.startTime,
            endTime: event.dataValues.endTime,
            startDate: event.dataValues.startDate,
            endDate: event.dataValues.endDate
          },
          answer: event.EventVolunteer.dataValues
        }
      })

    res.json({success: true, userEvents}).status(200).end()
   })
}

module.exports = getInvites
