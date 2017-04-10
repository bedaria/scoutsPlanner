'use strict'

const models = require('../../models/index.js')

//Gets info on event for an admin
//resp.body will have:
//    <array<{volunteers: {name: <string>,
//                         id: <string>,
//                         isAttending: <string>
//                         startTime: <string>,
//                         endTime: <string>},
//            attendance: {no: {names:<array>, count: <number>},
//                        yes: {names:<array>, count: <number>},
//                        maybe: {names:<array>, count: <number>},
//                        noAnswer: {names:<array>, count: <number>}}}>>
const checkEvent = function(req, res) {
  if(!req.user)
    Promise.reject("User must be logged in.")

  if(!Number.isInteger(Number(req.params.event)))
    res.json({"error": "Invalid eventId parameter."}).status(200).end()
  else {
    models.Event.findOne({where: {id: req.params.event}})
      .then(event => {
        const isAdminOfEvent = event.dataValues.mainAdminId === req.user.id

        if(isAdminOfEvent)
          return event.getVolunteer()
        else
          return Promise.reject("Not an admin!")
      })
      .then(volunteers => {
        volunteers = filterVolunteerInfo(volunteers)
        const attendance = getAttendanceInfo(volunteers)
        const timeBlocks = getTimeBlocks(volunteers)

        res.json({volunteers, attendance, timeBlocks}).status(200).end()
      })
      .catch(err => {
        console.log(__filename, ": ERROR: ", err)
        res.status(500).end()
      })
  }
}

//INPUT: volunteers: <array<models.User>>
//OUTPUT: volunteers: {name: <string>,
//                     id: <string>,
//                     isAttending: <string>
//                     startTime: <string>,
//                     endTime: <string>}
const filterVolunteerInfo = (volunteers) => {
  return volunteers.map(volunteer => {
    return {
      name: volunteer.dataValues.name,
      id: volunteer.dataValues.id,
      startTime: volunteer.dataValues.EventVolunteer.startTime,
      endTime: volunteer.dataValues.EventVolunteer.endTime,
      isAttending: volunteer.dataValues.EventVolunteer.isAttending
    }
  })
}

//INPUT: volunteers: {name: <string>,
//                    id: <string>,
//                    isAttending: <string>
//                    startTime: <string>,
//                    endTime: <string>}
//OUTPUT: attendance: {no: {names:<array>, count: <number>},
//                     yes: {names:<array>, count: <number>},
//                     maybe: {names:<array>, count: <number>},
//                     noAnswer: {names:<array>, count: <number>}}}>>
const getAttendanceInfo = (volunteers) => {
  var attending = {count: 0, names: []}
  var maybe = {count: 0, names: []}
  var no = {count: 0, names: []}
  var noAnswer = {count: 0, names: []}

  volunteers.forEach(volunteer => {
    var isAttending = volunteer.isAttending
    var name = volunteer.name
    var id = volunteer.id
    const addTo = (obj) => {
      obj.count++
      obj.names.push({name, id})
    }

    switch (volunteer.isAttending) {
      case 'Yes':
        addTo(attending)
        break
      case 'No':
        addTo(no)
        break
      case 'Maybe':
        addTo(maybe)
        break
      default:
        addTo(noAnswer)
    }
  })

  return {attending, maybe, no, noAnswer}
}

//INPUT: volunteers: {name: <string>,
//                    id: <string>,
//                    isAttending: <string>
//                    startTime: <string>,
//                    endTime: <string>}
//OUTPUT: uniqueTimesL <array<string>> (string: "12:00" or "17:15")
const getUniqueTimes = (volunteers) => {
  var timesSet = new Set()

  volunteers.forEach(volunteer => {
    var startTime = volunteer.startTime
    var endTime = volunteer.endTime

    if(startTime && endTime) {
      timesSet.add(startTime)
      timesSet.add(endTime)
    }
  })

  return Array.from(timesSet).sort()
}

//INPUT: n: <number>
//OUTPUT: [0,0,0.....,0]
const toZeroArray = (n) => {
  var array = []
  for(var i = 0; i < n; i++)
    array[i] = 0
  return array
}

//INPUT: volunteers: {name: <string>,
//                    id: <string>,
//                    isAttending: <string>
//                    startTime: <string>,
//                    endTime: <string>}
//OUTPUT: volunteerBlocks: <array> of
//                         {startTime <string>,
//                          endTime<string>,
//                          volunteerCount<string>}
const getTimeBlocks = (volunteers) => {
  var times = getUniqueTimes(volunteers)
  var volunteerCount = toZeroArray(times.length-1)
  var timeBlocks = []

  volunteers.forEach(volunteer => {
    var startTime = volunteer.startTime
    var endTime = volunteer.endTime
    var startBlockIdx = 0
    var endBlockIdx = 0

    for(var idx = 0; idx < times.length; idx++)
      if(startTime === times[idx]){
        startBlockIdx = idx
        break;
      }

    for(var idx = startBlockIdx + 1; idx < times.length; idx++)
      if(endTime === times[idx]){
        endBlockIdx = idx
        break;
      }

    for(var idx = startBlockIdx; idx < endBlockIdx; idx++){
      volunteerCount[idx]++
    }
  })

  for(var i = 0; i < times.length-1; i++) {
    timeBlocks[i] = {}
    timeBlocks[i].startTime = times[i]
    timeBlocks[i].endTime = times[i+1]
    timeBlocks[i].volunteerCount = volunteerCount[i]
  }

  return timeBlocks
}


module.exports = checkEvent
