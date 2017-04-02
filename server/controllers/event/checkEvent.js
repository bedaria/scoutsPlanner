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
  //event.getUsers
  models.Event.findOne({where: {id: req.params.event}})
    .then(event => {
      console.log("adminId: ", event.dataValues.mainAdminId)
      console.log("and we havee: ", req.user.id )
      var isAdminOfEvent = event.dataValues.mainAdminId === req.user.id
      if(isAdminOfEvent)
        return event.getUsers()
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
      console.log("(./server/controllers/event/checkEvent) ERROR: ", err)
      res.status(300).end()
    })
}

module.exports = checkEvent
