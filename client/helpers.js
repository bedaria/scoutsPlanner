import axios from 'axios'

export const getUsers = (callback) => {
  const username = localStorage.username

  axios.get('/users/admin/')
    .then(users => {
       callback({users: users.data.users})
    })
    .catch(error => {
      console.log("Error in getUsers: ", error)
      callBack({hasError: true})
    })
}

export const createEventAndInvite = (state, callback) => {
  const username = localStorage.username

  axios.post('/users/admin/'+ username + '/events', {
    name: state.name,
    startTime: state.startTime,
    endTime: state.endTime,
    startDate: state.startDate,
    endDate: state.endDate,
    message: state.message
  })
  .then(({data}) => {
    const tasksPath = '/users/admin/' + username + '/events/' + data.eventId + '/tasks'
    const invitePath = '/users/admin/' + username + '/events/' + data.eventId
    return Promise.all([axios.post(tasksPath, {tasks: state.tasks}),
                        axios.post(invitePath, {invited: state.selectedUsers})])
  })
  .then((results) => {
      const [tasks, invites] = results
      if(tasks.data.success && invites.data.success)
        callback({message: "Everyone succesfully invited!"})
      else
        callback({errorMessage: "Error occurred, try again."})
  })
  .catch(error => console.log("error: ", error))
}

export const getUserEvents = (updateEvents) => {
  const username = localStorage.username

  axios.get('/users/' + username + '/events')
    .then(events => {
      updateEvents({
        userEvents: events.data.userEvents,
        adminEvents: events.data.adminEvents,
        gotEvents: true})
    })
    .catch(error => {
      updateEvents({error: "Error retrieving events, please reload."})
    })
}


export const updateInvite = (infoToUpdate, eventId, updateAttendance, closeAnswer) => {
  const username = localStorage.username
  axios.post('/users/' + username + '/events/' + eventId, infoToUpdate)
    .then(({data}) => {
      const volunteerInfo = data.volunteerInfo

      closeAnswer()
      updateAttendance({
        isAttending: volunteerInfo.isAttending,
        volunteeringFrom: volunteerInfo.startTime,
        volunteeringTill: volunteerInfo.endTime })
    })
    .catch(error => {
      console.log("Error: ", error)
      updateAttendance({error: "OOps...."})
    })
  }

  export const getAdminEvent = (eventId, callback) => {
    const username = localStorage.username
    axios.get('/users/admin/' + username + '/events/' + eventId)
      .then(eventInfo => {
        callback(eventInfo.data, eventId)
      })
      .catch(error => {
        callback({error: "Error retrieving event."})
      })
  }
