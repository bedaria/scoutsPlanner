import axios from 'axios'

var username = ''
var config = {}

export const getUsers = (callback) => {
  axios.get('/users')
    .then(({data}) => {
      callback({users: data.users})
    })
    .catch(error => {
      console.log("Error in getUsers: ", error)
      callback({hasError: true})
    })
}

export const createEventAndInvite = (state, callback) => {
  var eventId = null
  axios.post('/admin/events', config, {
    name: state.name,
    startTime: state.startTime,
    endTime: state.endTime,
    startDate: state.startDate,
    endDate: state.endDate,
    message: state.message
  })
  .then(({data}) => {
    eventId = data.eventId
    const tasksPath = '/users/admin/' + username + '/events/' + data.eventId + '/tasks'
    const invitePath = '/users/admin/' + username + '/events/' + data.eventId
    return Promise.all([axios.post(tasksPath, {tasks: state.tasks}),
                        axios.post(invitePath, {invited: state.selectedUsers})])
  })
  .then((results) => {
      const [tasks, invites] = results
      if(tasks.data.success && invites.data.success) {
        callback({message: "Everyone succesfully invited!"})
        axios.post('/tests/events/' + eventId)
      }
      else
        callback({errorMessage: "Error occurred, try again."})
  })
  .catch(error => console.log("error: ", error))
}

export const getUserEvents = (updateEvents) => {

  axios.post('/login')
    .then(({data}) => {
      const { username, token } = data

      localStorage.setItem('username', username)
      config = { headers : {'x-access-token': token }}

      axios.get('/events', config)
        .then(events => {
          updateEvents({
            userEvents: events.data.userEvents,
            adminEvents: events.data.adminEvents,
            gotEvents: true})
        })
        .catch(error => {
          console.log("error: ", error)
          updateEvents({error: "Error retrieving events, please reload."})
        })
    })
    .catch(error => {
      console.log("error: ", error)
      console.log("ERROR getting username:( ")
    })
}

export const getEventTasks = (eventId, getTasks) => {
  axios.get('/events/' + eventId + '/tasks')
    .then(({data}) => {
      getTasks(data.tasks)
    })
    .catch(error => {
      console.log("error: ", error)
      getTasks([], {error: "couldn't get tasks..."})
    })
}

export const updateInvite = (infoToUpdate, eventId, updateAttendance, closeAnswer) => {
  const requests = []

  if(infoToUpdate.taskId) {
    Promise.all([axios.post('/users/' + username + '/tasks/', {taskId: infoToUpdate.taskId}),
      axios.post('/users/' + username + '/events/' + eventId, infoToUpdate)
    ])
      .then(results => {
         const [taskUpdate, inviteUpdate] = results

         if(taskUpdate.data.success && inviteUpdate.data.success) {
           closeAnswer()
           updateAttendance({
             isAttending: infoToUpdate.isAttending,
             volunteeringFrom: infoToUpdate.startTime,
             volunteeringTill: infoToUpdate.endTime,
             volunteeringFor: infoToUpdate.taskId})
         }
         else
           closeAnswer("Try again please")
      })
      .catch(error => {
        console.log("updateInvite Error: ", error)
        closeAnswer("Try again please")
      })
  }
  else
    axios.post('/users/' + username + '/events/' + eventId, infoToUpdate)
      .then(inviteUpdate => {

        if(inviteUpdate.data.success) {
          closeAnswer()
          updateAttendance({
            isAttending: infoToUpdate.isAttending,
            volunteeringFrom: infoToUpdate.startTime,
            volunteeringTill: infoToUpdate.endTime,
            volunteeringFor: infoToUpdate.taskId})
        }
        else
          closeAnswer("Try again please")
     })
     .catch(error => {
       console.log("updateInvite Error: ", error)
       closeAnswer("Try again please")
     })
  }

  export const getAdminEvent = (eventId, callback) => {
    axios.get('/users/admin/' + username + '/events/' + eventId)
      .then(eventInfo => {
        callback(eventInfo.data, eventId)
      })
      .catch(error => {
        callback({error: "Error retrieving event."})
      })
  }
