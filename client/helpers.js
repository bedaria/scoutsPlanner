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
      const path = '/users/admin/' + username + '/events/' + data.eventId
      return axios.post(path, {invited: state.selectedUsers})
  })
  .then(({data}) => {
      callback({message: "Everyone succesfully invited!"})
  })
  .catch(error => {
    console.log("Error in createEventAndInvite: ", error)
    callback({errorMessage: "Oops, something went wrong...hold on."})
  })
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
