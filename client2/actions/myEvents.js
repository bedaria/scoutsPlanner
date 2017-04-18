import axios from 'axios'

const requestMyEvents = () => {
  return {
    type: 'REQUEST_MY_EVENTS',
    isFetching: true
  }
}

const receiveMyEvents = (status, myEvents) => {
  const payload = status === "success" ?
    {myEvents, isFetching: false} :
    {isFetching: false, errorFetching: true}

  return {
    type: 'RECEIVE_MY_EVENTS',
    payload
  }
}

export const getMyEvents = () => {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  return (dispatch) => {
    dispatch(requestMyEvents())
    axios.get('/events')
      .then(({data}) => {
        dispatch(receiveMyEvents("success", data.adminEvents))
      })
      .catch(error => {
        dispatch(receiveMyEvents("error"))
      })
  }
}
