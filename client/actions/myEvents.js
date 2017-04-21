import axios from 'axios'

const requestMyEvents = () => {
  return {
    type: 'REQUEST_MY_EVENTS'
  }
}

const receiveMyEvents = (status, myEvents) => {
  const payload = status === "success" ?
    { myEvents, errorFetching: false } : { errorFetching: true }

  return {
    type: 'RECEIVE_MY_EVENTS',
    payload
  }
}

const requestMyEvent = (eventId) => {
  return {
    type: 'REQUEST_MY_EVENT',
    redirectToId: eventId
  }
}

const receiveMyEvent = (status, volunteerInfo, eventTasks) => {
  const payload = status === "success" ?
    { eventVolunteers: volunteerInfo, eventTasks } :
    { errorFetchingEvent: true }

  return {
    type: 'RECEIVE_MY_EVENT',
    payload
  }
}

export const doneRedirecting = () => {
  return {
    type: 'REDIRECTED'
  }
}


const separateAttendance = (volunteerInfo) => {
  var attendance = {
    Yes: [],
    No: [],
    Maybe: [],
    null: []
  }

  volunteerInfo.forEach(volunteer => {
    const answer = volunteer.isAttending
    attendance[answer].push(volunteer)
  })

  const payload = {
    yes: attendance.Yes,
    no: attendance.No,
    maybe: attendance.Maybe,
    notAnswered: attendance.null
  }

  return {
    type: 'SEPARATED_ATTENDANCE',
    payload
  }
}

export const getMyEvent = (eventId) => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(requestMyEvent(eventId))

    const getVolunteerInfo = () => (axios.get('/api/events/' + eventId))
    const getEventTasks = () => (axios.get('/api/events/' + eventId + '/tasks'))

    axios.all([getVolunteerInfo(), getEventTasks()])
      .then(axios.spread((event, eventTasks) => {
            dispatch(receiveMyEvent("success", event.data.volunteerInfo, eventTasks.data.tasks))
            dispatch(separateAttendance(event.data.volunteerInfo))
          })
      )
      .catch(error => {
        dispatch(receiveMyEvent("error"))
      })
  }
}

export const getMyEvents = () => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(requestMyEvents())
    axios.get('/api/events')
      .then(({data}) => {
        dispatch(receiveMyEvents("success", data.adminEvents))
      })
      .catch(error => {
        dispatch(receiveMyEvents("error"))
      })
  }
}
