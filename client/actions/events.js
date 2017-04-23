import axios from 'axios'

const isFetching = () => {
  return {
    type: 'REQUEST_EVENTS',
    payload: {
      isFetching: true,
      errorFetching: false
    }
  }
}

const gotEvents = (status, events) =>  {
  const payload = status === "success" ?
    { isFetching: false, errorFetching: false, events }:
    { isFetching: false, errorFetching: true }

  return {
    type: 'RECEIVE_EVENTS',
    payload
  }
}

export const getEvents = () => {
  return (dispatch) => {
    dispatch(isFetching())
    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }

    return axios.get('/api/events', config)
      .then(({data}) => {
        dispatch(gotEvents("success", data.events))
      })
      .catch(error => {
        console.log("error fetching events: ", error)
        dispatch(gotEvents("error"))
      })
}

}
