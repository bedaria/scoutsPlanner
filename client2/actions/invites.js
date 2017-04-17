import axios from 'axios'

const requestInvites = () => {
  return {
    type: 'REQUEST_INVITES',
    isFetching: true
  }
}

const receiveInvites = (status, invites) => {
  const payload = status === "success" ?
    {invites: invites, isFetching: false} :
    {isFetching: false, errorFetching: true}

  return {
    type: 'RECEIVE_INVITES',
    payload
  }
}

export const getInvites = () => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(requestInvites())
    axios.get('/invites')
      .then(({data}) => {
        dispatch(receiveInvites("success", data.userEvents))
      })
      .catch(error => {
        dispatch(receiveInvites("error"))
      })
  }
}
