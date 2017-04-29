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

export const createEvent = (eventInfo) => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')

  return (dispatch) => {
    dispatch(submitNewEvent())
    axios.post('/api/user/events', eventInfo)
      .then(({ data }) => {
        console.log("got data: ", data)
      })
      .catch(error => {
        console.log(" myerror: ", error)
      })

    }


}
