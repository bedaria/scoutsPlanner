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

const filterEvents = (events) => {
  var invites = []
  var adminEvents = []

  events.forEach(event => {
    if(event.isAdmin)
      adminEvents.push(event)
    else
      invites.push(event)
  })

  return {
    type: 'FILTER_EVENTS',
    payload: {
      invites,
      adminEvents
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

    return axios.get('/api/user/events', config)
      .then(({data}) => {
        dispatch(gotEvents("success", data.events))
        dispatch(makeEventsObject(data.events))
        dispatch(filterEvents(data.events))
      })
      .catch(error => {
        console.log("error fetching events: ", error)
        dispatch(gotEvents("error"))
      })
    }
}

const makeEventsObject = (events) => {
  const eventsById = events.reduce((byId, event) => {
    byId[event.id] = event
    return byId
  }, {})

  return {
    type: 'MAKE_EVENTS_OBJECT',
    eventsById
  }
}
