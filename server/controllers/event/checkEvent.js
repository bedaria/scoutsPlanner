'use strict'

const models = require('../../models/index.js')

//Gets updated info on event for an admin
//INPUT:
//OUTPUT: <array> {userInfo: models.Event.dataValues,
//                 attendanceInfo: models.EventVolunteer.dataValues,
//                 attendance: {totalAttending: <int>, totalMaybe: <int>,
//                 totalNo: <int>, totalNotChecked}:<int>}
const checkEvent = function(req, res) {
  //are you the admin for this event?
  if(!Number.isInteger(Number(req.params.event)))
    res.json({"error": "Invalid eventId parameter."}).status(200).end()
  else {
    models.Event.findOne({where: {id: req.params.event}})
      .then(event => {
        const isAdminOfEvent = event.dataValues.mainAdminId === req.user.id
        if(isAdminOfEvent)
          return event.getVolunteer()
        else
          throw new Error(`Not an admin!`)
      })
      .then(users => {
        var attendance = {}
        attendance.totalAttending = 0
        attendance.totalMaybe = 0
        attendance.totalNo = 0
        attendance.totalNotChecked = 0

        if(users)
          users = users.map(user => {
            var userAttendance = user.dataValues.EventVolunteer.isAttending

            switch (userAttendance) {
              case 'Yes': attendance.totalAttending++
              case 'No': attendance.totalNo++
              case 'Maybe': attendance.totalMaybe++
              default: attendance.totalNotChecked++
            }

            return {userInfo: user.dataValues, attendanceInfo: user.dataValues.EventVolunteer}
          })

        res.json({users: users, attendance: attendance}).status(200).end()
      })
      .catch(err => {
        console.log(__filename, ": ERROR: ", err)
        res.status(500).end()
      })
  }
}

module.exports = checkEvent
