import axios from 'axios'

export const getUsers = (callback) => {
  const username = localStorage.username

  axios.get('/users/admin/')
    .then(users => {
      if(!Array.isArray(users.data.users) || users.data.users.length < 1) {
        callback({hasError: true})
        return Promise.reject(new Error("Returned users were wrong in getUsers"))
      }
      else if(typeof users.data.users[0].name !== 'string' || typeof users.data.users[0].id !== 'number') {
        callback({hasError: true})
        return Promise.reject(new Error("Returned users should be of form: {name, id}"))
      }
      else
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
    if(!data.sentTo.length || data.sentTo.length !== state.selectedUsers.length)
      console.log("data.sentTo came back empty or a different length in createAndInvite")

      callback({message: "Successfully invited people!"})
  })
  .catch(error => {
    console.log("Error in createEventAndInvite: ", error)
    callback({errorMessage: "Oops, something went wrong..hold on."})
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
      updateEvents({error: "Error retrieving events."})
    })
}


export const updateInvite = (infoToUpdate, eventId, updateAttendance, closeAnswer) => {
 const username = localStorage.username
  axios.post('/users/' + username + '/events/' + eventId, infoToUpdate)
    .then(updated => {
      const volunteerInfo = updated.data.volunteerInfo
      console.log("infoToUpdate: ", infoToUpdate)
      if(!infoToUpdate.seen){
        closeAnswer()
        updateAttendance({
          isAttending: volunteerInfo.isAttending,
          volunteerFrom: volunteerInfo.startTime,
          volunteerTill: volunteerInfo.endTime
        })
      }
    })
    .catch(error => {
      console.log("error: ", error)
      // updateAttendance({error: "Couldn't update event: " + eventId})
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
