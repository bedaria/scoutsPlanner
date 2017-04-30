import axios from 'axios'

const submitReply = () => {
  return {
    type: 'SUBMIT_REPLY',
    payload: {
      isSubmitting: true,
      errorSubmitting: false
    }
  }
}

const doneSubmittingReply = (status) => {
  const payload = status === "success" ?
    { isSubmitting: false, errorSubmitting: false }:
    { isSubmitting: false, errorSubmitting: true}

  return {
    type: 'DONE_SUBMITTING',
    payload
  }
}

export const replyToEvent = (reply, eventId) => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  axios.defaults.baseURL = 'http://localhost:3000'
  return (dispatch) => {
    dispatch(submitReply())
    axios.put('/api/user/events/' + eventId + '/reply', reply)
      .then(({ data }) => {
        dispatch(doneSubmittingReply('success'))
      })
      .catch(error => {
        console.log("error: ", error.message)
        dispatch(doneSubmittingReply('error'))
      })

  }
}
