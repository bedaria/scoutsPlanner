'use strict'

const models = require('../../models/index.js')

//Gets info on event for an admin
//resp.body will have:
//    <array<{info: <array>{name: <string>,
//                         id: <string>,
//                         isAttending: <string>
//                         startTime: <string>,
//                         endTime: <string>}
const getAdminEventVolunteers = (req, res) => {

  models.Event.findOne({where: {id: req.event.id}})
    .then(event => event.getVolunteer({attributes: ['id', 'name']}))
    .then(volunteers => {
      const volunteerInfo = volunteers.reduce((info, volunteer) => {
        info.push({
          id: volunteer.id,
          name: volunteer.name,
          startTime: volunteer.EventVolunteer.startTime,
          endTime: volunteer.EventVolunteer.endTime,
          isAttending: volunteer.EventVolunteer.isAttending
        })

        return info
      }, [])
      console.log("invited: ", volunteers.length)
      console.log("Returning: ", volunteerInfo)
      res.json({volunteerInfo}).status(200).end()
    })
}

module.exports = getAdminEventVolunteers
