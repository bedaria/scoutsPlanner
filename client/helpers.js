import axios from 'axios'

const username = localStorage.username

export const createEventAndInvite = (state, done) => {
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
  axios.get('/users/' + username + '/events')
    .then(events => {
      updateEvents({events: events.data.events, gotEvents: true})
    })
    .catch(error => {
      console.log("Error retrieving events: ", error)
      updateEvents({error: "Error retrieving events."})
    })
}
