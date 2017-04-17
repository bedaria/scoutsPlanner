import axios from 'axios'

const submitNewEvent = () => {
  return {
    type: 'SUBMIT_NEW_EVENT',
    isSubmitting: true
  }
}

const doneCreating = (status) => {
  status === "success" ?
    {isSubmitting: false, redirect: true, updateAdminList: true} :
    {isSubmitting: false, errorCreating: true}

  return {
    type: 'NEW_EVENT_CREATED',
    payload
  }
}

export const resetRedirect = () => {
  return {
    type: 'RESET_REDIRECT',
    redirect: false
  }
}

export const createEvent = (allUsers) => {
  const eventInfo = {
    name: "Bury lizards",
    tasks: [{name: "Guard"}, {name: "Digger"}, {name: "Feeder"}],
    message: "",
    startTime: "05:00",
    endTime: "05:30",
    startDate: "04/17/2017",
    endDate: "04/17/2017",
    invited: allUsers.map(user => user.id)
  }

  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(submitNewEvent())
    axios.post('/events', eventInfo)
      .then(({ data }) => {
        const inviteFriends = () => {
          return axios.post('/events/' + data.eventId + '/invites', {invited: eventInfo.invited})
        }
        var requests = [inviteFriends]

        if(eventInfo.tasks.length) {
          const addTasks = () => {
            return axios.post('/events/' + data.eventId + '/tasks', {tasks: eventInfo.tasks})
          }
          requests.push(addTasks)
        }

        axios.all(requests.map(request => request()))
          .then(axios.spread((friendsInvited, tasksAdded) => {
              dispatch(doneCreating("success"))
              axios.post('/fakeAnswers/' + data.eventId)
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
