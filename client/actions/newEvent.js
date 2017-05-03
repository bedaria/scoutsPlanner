import axios from 'axios'

const submitNewEvent = () => {
  return {
    type: 'SUBMIT_NEW_EVENT',
    payload: {
      isCreating: true,
      errorCreating: false,
      eventId: ''
    }
  }
}

const doneCreating = (status, eventId) => {
  const payload = status === 'success' ?
    { isCreating: false, errorCreating: false, successCreating: true, eventId } :
    { isCreating: true, errorCreating: true, successCreating: false, eventId: '' }

    return {
      type: 'NEW_EVENT_CREATED',
      payload
    }
}

export const reset = () => {
  return {
    type: 'RESET',
    successCreating: false
  }
}

export const createEvent = (eventInfo) => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')

  return (dispatch) => {
    dispatch(submitNewEvent())
    axios.post('/api/user/events', eventInfo)
      .then(({ data }) => {
        dispatch(doneCreating('success', data.eventId))
      })
      .catch(error => {
        console.log("error: ", error.message)
        dispatch(doneCreating('error'))
      })
    }
}
