import axios from 'axios'

const submitReply = () => {
  return {
    type: 'SUBMIT_REPLY',
    payload: {
      isSubmitting: true,
      errorSubmitting: falsee
    }
  }
}

const submittedReply = (status) => {
  const payload = status === "success" ?
    { isSubmitting: false, errorSubmitting: false }:
    { isSubmitting: false, errorSubmitting: true}

  return {
    type: 'DONE_SUBMITTING',
    payload
  }
}

export const putReply = (reply) => {
  return (dispatch) => {
    dispatch(submitReply())
    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }

    // return axios.put()

  }
}
