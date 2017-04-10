import axios from 'axios'

export const getUsers = (callback) => {
  const username = localStorage.username

  axios.get('/users/admin/')
    .then(users => {
      console.log("got users from back")
      callback({users: users.data.users})
    })
    .catch(error => {
      console.log("error: ", error)
      callback({error: "Couldn't get your friends, hold on...."})
    })
}

export const createEventAndInvite = (state, done) => {
  const username = localStorage.username

  axios.post('/users/admin/'+ username + '/events', {
    name: state.name,
    startTime: state.startTime,
    endTime: state.endTime,
    startDate: state.startDate,
    endDate: state.endDate,
    message: state.message
  })
  .then(eventData => {
    console.log("eventData: ", eventData)
    if(eventData.error){
      this.setState({errorMessage: eventData.error})
      Promise.reject(eventData.error)
    }
    else
      return axios.post('/users/admin/' + username + '/events/' + eventData.data.dataValues.id, {
        invited: state.selected
      })
  })
  .then(successfullyInvited => {
    console.log("successfullyInvited: ", successfullyInvited)
    done("success")
  })
  .catch(err => {
    console.log("ERROR creating/sending event: ", err)
    done(err)
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
      updateAttendance({error: "Couldn't update event: " + eventId})
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
