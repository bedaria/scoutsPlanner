import axios from 'axios'

const createEventAndInvite = (state) => {
  axios.post('/users/admin/Copper/events', {
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
      return axios.post('/users/admin/Copper/events/' + eventData.data.dataValues.id, {
        invited: state.invited
      })
  })
  .then(successfullyInvited => {
    console.log("Invites successfully sent")
  })
  .catch(err => console.log("Error: ", err))
}

export default createEventAndInvite
