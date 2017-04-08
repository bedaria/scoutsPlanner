import axios from 'axios'



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

    if(eventData.error){
      this.setState({errorMessage: eventData.error})
      Promise.reject(eventData.error)
    }
    else
      return axios.post('/users/admin/' + usernae + '/events/' + eventData.data.dataValues.id, {
        invited: state.invited
      })
  })
  .then(successfullyInvited => {
    done("success")
  })
  .catch(err => {
    console.log("ERROR creating/sending event: ", err)
    done(err)
  })
}

export const getUserEvents = (updateEvents) => {
  const username = localStorage.username
  console.log("username: ", username)
  axios.get('/users/' + username + '/events')
    .then(events => {
      updateEvents({events: events.data.events, gotEvents: true})
    })
    .catch(error => {
      updateEvents({error: "Error retrieving events."})
    })
}


// Need
// {isAttending: <valueIn ['Yes', 'Maybe', 'No']>,
//                        startTime: <string>,
//                        endTime: <string>,
//                        seen: boolean }
//updateAttendance:
//closeAnswer:
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
