const models = require('../models/index.js')

const fakeInviteAnswers = (req, res) => {
  var startTime = ''
  var endTime = ''
  console.log("Faking answers")
  models.Event.findOne({
    where: {id: req.event.id}
  })
    .then(event => {
      startTime = event.dataValues.startTime
      endTime = event.dataValues.endTime
      return Promise.all([event.getTasks(), event.getVolunteer()])
    })
    .then(results => {
      const tasks = results[0]
      const volunteers = results[1]
      const answers = []

      for(var i = 0; i < volunteers.length; i++)
        answers[i] = fakeAnswers(tasks.length, startTime, endTime)

      const filteredVolunteers = volunteers.filter((volunteer, idx) => answers[idx].taskIdx !== null)
      const filteredAnswers = answers.filter(answer => answer.taskIdx !== null)

      return Promise.all(
        volunteers.map((volunteer,idx) => {
          const eventVolunteer = volunteer.dataValues.EventVolunteer
          return eventVolunteer.update(answers[idx].updateInfo)
        })
        .concat(
          filteredVolunteers.map((volunteer, idx) => {
            const taskIdx = filteredAnswers[idx].taskIdx
            return volunteer.addTask(tasks[taskIdx])
          })
        )
      )
    })
    .then(results => {
      console.log("Done fake answering!")
      res.json({success: true}).status(200).end()
    })
    .catch(error => {
      console.log("Error faking answers: ", error)
      console.log(error.stack)
      res.json({success: false}).status(500).end()
    })
}

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random()* (max-min)) + min
}

const toMinutes = (hours, minutes) => {
  return hours * 60 + minutes
}

const toTime = (totalMinutes) => {
  const hour = Math.floor(totalMinutes / 60)
  const minutes = Math.floor(totalMinutes % 60)
  const stringHour = Number.isInteger(hour) ?  hour.toString() : '0' + hour.toString()
  const stringMinutes = minutes % 60 !== 0 ? minutes.toString() : '00'

  return [stringHour, stringMinutes, '00'].join(":")
}

const getRandomTimeBetween = (start, end) => {
  const startArray = start.split(":").map(n => Number(n))
  const endArray = end.split(":").map(n => Number(n))
  const startMinutes = toMinutes(startArray[0], startArray[1])
  const endMinutes = toMinutes(endArray[0], endArray[1])
  const maxOffset = Math.floor((endMinutes - startMinutes)/15) //assuming times are multiples of 15

  //volunter for at least an hour
  const startTimeOffset = getRandomNumberBetween(0, maxOffset - 4)
  const endTimeOffset = getRandomNumberBetween(startTimeOffset + 4, maxOffset)

  const startTime = toTime(startMinutes + startTimeOffset * 15)
  const endTime = toTime(startMinutes + endTimeOffset * 15)
  return {startTime, endTime}
}

const fakeAnswers = (taskCount, startTime, endTime) => {
  const number = getRandomNumberBetween(0,3)
  var pickedTaskIdx = null
  var updateInfo = {}
  var volunteerTimes = {}

  if(number === 0) {
    updateInfo['isAttending'] = 'Yes'
    volunteerTimes = getRandomTimeBetween(startTime, endTime)
    updateInfo['startTime'] = volunteerTimes.startTime
    updateInfo['endTime'] = volunteerTimes.endTime

    if(taskCount)
       pickedTaskIdx = getRandomNumberBetween(0, taskCount - 1)
  }

  if(number === 1)
    updateInfo['isAttending'] = 'No'

  if(number === 2)
    updateInfo['isAttending'] = 'Maybe'

  return {updateInfo, taskIdx: pickedTaskIdx}
}

module.exports = fakeInviteAnswers
