import axios from 'axios'

const submitNewEvent = () => {
  return {
    type: 'SUBMIT_NEW_EVENT',
    payload: {
      isCreating: true,
      errorCreating: false
    }
  }
}

const doneCreating = (status) => {
  payload = status === "success" ?
    { isCreating: false, errorCreating: false } :
    { isCreating: true, errorCreating: true }

  return {
    type: 'NEW_EVENT_CREATED',
    payload
  }
}

export const createEvent = (eventInfo, friends) => {
  if(eventInfo.invited[0].id === 0)
    eventInfo.invited = friends

  eventInfo.endDate = eventInfo.date
  eventInfo.startDate = eventInfo.date
  eventInfo.invited = eventInfo.invited.map(invitee => invitee.id)
  //eventInfo.name, eventInfo.address

  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(submitNewEvent())
    axios.post('/api/events', eventInfo)
      .then(({ data }) => {
        const inviteFriends = () => {
          return axios.post('/api/events/' + data.eventId + '/invites', {invited: eventInfo.invited})
        }
        var requests = [inviteFriends]

        if(eventInfo.tasks) {
          const addTasks = () => {
            return axios.post('/api/events/' + data.eventId + '/tasks', {tasks: eventInfo.tasks})
          }
          requests.push(addTasks)
        }

        axios.all(requests.map(request => request()))
          .then(axios.spread((friendsInvited, tasksAdded) => {
              dispatch(doneCreating("success"))
              // axios.post('/fakeAnswers/' + data.eventId)
            })
          )
          .catch(error => {
            dispatch(doneCreating("error"))
          })
      })
      .catch(error => {
        dispatch(doneCreating("error"))
      })
  }
}
